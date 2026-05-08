import { IUserRepository } from '../../domain/repositories/user.repository'

import { LoginUserDTO } from '../dto/login-user.dto'

import {
  AppError
} from '@appointment-platform/shared-errors'

import { comparePassword } from '../../infrastructure/auth/password'

import {
  generateAccessToken,
  generateRefreshToken
} from '../../infrastructure/auth/jwt'

import { User } from '../../domain/entities/user.entity'

import { storeRefreshSession } from '../../infrastructure/cache/session'

type LoginUserResponse = {
  accessToken: string

  refreshToken: string

  user: User
}

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(
    dto: LoginUserDTO
  ): Promise<LoginUserResponse> {
    const user =
      await this.userRepository.findByEmail(
        dto.email
      )

    if (!user || !user.passwordHash) {
      throw new AppError(
        'Invalid credentials',
        401
      )
    }

    if (
      user.lockUntil &&
      user.lockUntil > new Date()
    ) {
      throw new AppError(
        'Account temporarily locked',
        423
      )
    }

    const isPasswordValid =
      await comparePassword(
        dto.password,
        user.passwordHash
      )

    if (!isPasswordValid) {
      user.incrementFailedLoginAttempts()

      if (
        user.failedLoginAttempts >= 5
      ) {
        user.lockUntil = new Date(
          Date.now() +
            15 * 60 * 1000
        )
      }

      await this.userRepository.update(
        user
      )

      throw new AppError(
        'Invalid credentials',
        401
      )
    }

    user.resetFailedLoginAttempts()

    user.lockUntil = null

    await this.userRepository.update(
      user
    )

    const accessToken =
      generateAccessToken({
        userId: user.id,
        email: user.email
      })

    const refreshToken =
      generateRefreshToken({
        userId: user.id,
        email: user.email
      })

    await storeRefreshSession(
      user.id,
      refreshToken
    )

    return {
      accessToken,
      refreshToken,
      user
    }
  }
}
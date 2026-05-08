import { randomUUID } from 'crypto'

import { IUserRepository } from '../../domain/repositories/user.repository'

import { User } from '../../domain/entities/user.entity'

import { RegisterUserDTO } from '../dto/register-user.dto'

import {
  AppError
} from '@appointment-platform/shared-errors'
import {
  generateAccessToken,
  generateRefreshToken
} from '../../infrastructure/auth/jwt'

import { hashPassword } from '../../infrastructure/auth/password'

import { UserRole } from '../../infrastructure/database/schemas/auth-user.schema'
import { storeRefreshSession } from '../../infrastructure/cache/session'

type RegisterUserResponse = {
  accessToken: string

  refreshToken: string

  user: User
}

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(
    dto: RegisterUserDTO
  ): Promise<RegisterUserResponse> {
    const existingUser =
      await this.userRepository.findByEmail(dto.email)

    if (existingUser) {
      throw new AppError('User already exists', 409)
    }

    const passwordHash = await hashPassword(dto.password)

    const user = new User(
      randomUUID(),

      dto.email,

      passwordHash,

      UserRole.PROVIDER,

      false,

      0,

      null,

      new Date(),

      new Date()
    )

    const createdUser =
      await this.userRepository.create(user)

    const accessToken = generateAccessToken({
      userId: createdUser.id,
      email: createdUser.email
    })

    const refreshToken = generateRefreshToken({
      userId: createdUser.id,
      email: createdUser.email
    })

    await storeRefreshSession(
  user.id,
  refreshToken
)

    return {
      accessToken,
      refreshToken,
      user: createdUser
    }
  }
}
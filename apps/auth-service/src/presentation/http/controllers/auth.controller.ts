import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  AppError
} from '@appointment-platform/shared-errors'
import { successResponse } from '../../../shared/utils/api-response'

import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie
} from '../../../shared/utils/auth-cookie'

import { registerUserSchema } from '../validators/register-user.validator'

import { loginUserSchema } from '../validators/login-user.validator'

import { makeRegisterUserUseCase } from '../../../application/factories/auth/make-register-user-use-case'

import { makeLoginUserUseCase } from '../../../application/factories/auth/make-login-user-use-case'

import { makeRefreshTokenUseCase } from '../../../application/factories/auth/make-refresh-token-use-case'

import { makeLogoutUserUseCase } from '../../../application/factories/auth/make-logout-user-use-case'

export class AuthController {
  public static async register(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const dto =
      registerUserSchema.parse(
        request.body
      )

    const registerUserUseCase =
      makeRegisterUserUseCase()

    const result =
      await registerUserUseCase.execute(
        dto
      )

    setRefreshTokenCookie(
      reply,
      result.refreshToken
    )

    reply.status(201).send(
      successResponse(
        'User registered successfully',
        {
          accessToken:
            result.accessToken,

          user: result.user
        }
      )
    )
  }

  public static async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const dto =
      loginUserSchema.parse(
        request.body
      )

    const loginUserUseCase =
      makeLoginUserUseCase()

    const result =
      await loginUserUseCase.execute(
        dto
      )

    setRefreshTokenCookie(
      reply,
      result.refreshToken
    )

    reply.status(200).send(
      successResponse(
        'Login successful',
        {
          accessToken:
            result.accessToken,

          user: result.user
        }
      )
    )
  }

  public static async refresh(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const refreshToken =
      request.cookies.refreshToken

    if (!refreshToken) {
      throw new AppError(
        'Unauthorized',
        401,
        'UNAUTHORIZED'
      )
    }

    const refreshTokenUseCase =
      makeRefreshTokenUseCase()

    const result =
      await refreshTokenUseCase.execute(
        refreshToken
      )

    reply.status(200).send(
      successResponse(
        'Access token refreshed successfully',
        result
      )
    )
  }

  public static async logout(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const refreshToken =
      request.cookies.refreshToken

    if (!refreshToken) {
      throw new AppError(
        'Unauthorized',
        401,
        'UNAUTHORIZED'
      )
    }

    const logoutUserUseCase =
      makeLogoutUserUseCase()

    await logoutUserUseCase.execute(
      refreshToken
    )

    clearRefreshTokenCookie(
      reply
    )

    reply.status(200).send(
      successResponse(
        'Logged out successfully',
        null
      )
    )
  }
}
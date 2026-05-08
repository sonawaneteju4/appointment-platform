import {
  AppError
} from '@appointment-platform/shared-errors'
import {
  verifyRefreshToken,
  generateAccessToken
} from '../../infrastructure/auth/jwt'

import { getRefreshSession } from '../../infrastructure/cache/session'

type RefreshTokenResponse = {
  accessToken: string
}

export class RefreshTokenUseCase {
  public async execute(
    refreshToken: string
  ): Promise<RefreshTokenResponse> {
    try {
      const payload =
        verifyRefreshToken(refreshToken)

      const storedSession =
        await getRefreshSession(
          payload.userId
        )

      if (
        !storedSession ||
        storedSession !== refreshToken
      ) {
        throw new AppError(
          'Invalid session',
          401
        )
      }

      const accessToken =
        generateAccessToken({
          userId: payload.userId,
          email: payload.email
        })

      return {
        accessToken
      }
    } catch {
      throw new AppError(
        'Unauthorized',
        401
      )
    }
  }
}
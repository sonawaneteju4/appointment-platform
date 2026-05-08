import { verifyRefreshToken } from '../../infrastructure/auth/jwt'

import { deleteRefreshSession } from '../../infrastructure/cache/session'

export class LogoutUserUseCase {
  public async execute(
    refreshToken: string
  ): Promise<void> {
    const payload =
      verifyRefreshToken(refreshToken)

    await deleteRefreshSession(
      payload.userId
    )
  }
}
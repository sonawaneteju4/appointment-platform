import { RefreshTokenUseCase } from '../../use-cases/refresh-token.use-case'

export const makeRefreshTokenUseCase =
  (): RefreshTokenUseCase => {
    return new RefreshTokenUseCase()
  }
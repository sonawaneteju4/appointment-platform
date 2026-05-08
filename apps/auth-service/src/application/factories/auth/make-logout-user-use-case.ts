import { LogoutUserUseCase } from '../../use-cases/logout-user.use-case'

export const makeLogoutUserUseCase =
  (): LogoutUserUseCase => {
    return new LogoutUserUseCase()
  }
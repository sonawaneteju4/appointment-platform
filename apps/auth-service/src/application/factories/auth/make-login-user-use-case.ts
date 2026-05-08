import { LoginUserUseCase } from '../../use-cases/login-user.use-case'

import { MongooseUserRepository } from '../../../infrastructure/repositories/mongoose-user.repository'

export const makeLoginUserUseCase =
  (): LoginUserUseCase => {
    const userRepository =
      new MongooseUserRepository()

    return new LoginUserUseCase(
      userRepository
    )
  }
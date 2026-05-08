import { RegisterUserUseCase } from '../../use-cases/register-user.use-case'

import { MongooseUserRepository } from '../../../infrastructure/repositories/mongoose-user.repository'

export const makeRegisterUserUseCase =
  (): RegisterUserUseCase => {
    const userRepository =
      new MongooseUserRepository()

    return new RegisterUserUseCase(
      userRepository
    )
  }
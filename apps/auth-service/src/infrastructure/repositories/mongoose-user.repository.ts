import { IUserRepository } from '../../domain/repositories/user.repository'

import { User } from '../../domain/entities/user.entity'

import { AuthUserModel } from '../database/schemas/auth-user.schema'

import { UserMapper } from '../database/mappers/user.mapper'

export class MongooseUserRepository
  implements IUserRepository
{
  public async create(user: User): Promise<User> {
    const createdUser = await AuthUserModel.create({
      _id: user.id,

      email: user.email,

      passwordHash: user.passwordHash,

      role: user.role,

      isEmailVerified: user.isEmailVerified,

      failedLoginAttempts: user.failedLoginAttempts,

      lockUntil: user.lockUntil,

      createdAt: user.createdAt,

      updatedAt: user.updatedAt,

      lastLoginAt: user.lastLoginAt
    })

    return UserMapper.toDomain(createdUser)
  }

  public async findByEmail(
    email: string
  ): Promise<User | null> {
    const user = await AuthUserModel.findOne({
      email
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  public async findById(
    id: string
  ): Promise<User | null> {
    const user = await AuthUserModel.findById(id)

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  public async update(user: User): Promise<User> {
    const updatedUser =
      await AuthUserModel.findByIdAndUpdate(
        user.id,
        {
          email: user.email,

          passwordHash: user.passwordHash,

          role: user.role,

          isEmailVerified: user.isEmailVerified,

          failedLoginAttempts:
            user.failedLoginAttempts,

          lockUntil: user.lockUntil,

          updatedAt: new Date(),

          lastLoginAt: user.lastLoginAt
        },
        {
          new: true
        }
      )

    if (!updatedUser) {
      throw new Error('User not found')
    }

    return UserMapper.toDomain(updatedUser)
  }
}
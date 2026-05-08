import { User } from '../../../domain/entities/user.entity'

import {
  AuthUserHydratedDocument
} from '../schemas/auth-user.schema'

export class UserMapper {
  public static toDomain(
    user: AuthUserHydratedDocument
  ): User {
    return new User(
      user._id.toString(),

      user.email,

      user.passwordHash,

      user.role,

      user.isEmailVerified,

      user.failedLoginAttempts,

      user.lockUntil ?? null,

      user.createdAt,

      user.updatedAt,

      user.lastLoginAt
    )
  }
}
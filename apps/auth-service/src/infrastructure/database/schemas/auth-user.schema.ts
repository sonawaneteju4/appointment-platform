import {
  HydratedDocument,
  Schema,
  model
} from 'mongoose'

export enum UserRole {
  PROVIDER = 'provider',
  ADMIN = 'admin'
}

export interface AuthUserDocument {
  _id: string

  email: string

  passwordHash: string | null

  role: UserRole

  isEmailVerified: boolean

  failedLoginAttempts: number

  lockUntil: Date | null

  createdAt: Date

  updatedAt: Date

  lastLoginAt?: Date
}

const AuthUserSchema =
  new Schema<AuthUserDocument>(
    {
      _id: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
      },

      passwordHash: {
        type: String,
        required: false
      },

      role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.PROVIDER,
        index: true
      },

      isEmailVerified: {
        type: Boolean,
        default: false,
        index: true
      },

      lastLoginAt: {
        type: Date
      },

      failedLoginAttempts: {
        type: Number,
        default: 0
      },

      lockUntil: {
        type: Date,
        default: null
      }
    },
    {
      timestamps: true,
      versionKey: false
    }
  )

export type AuthUserHydratedDocument =
  HydratedDocument<AuthUserDocument>

export const AuthUserModel =
  model<AuthUserDocument>(
    'AuthUser',
    AuthUserSchema
  )
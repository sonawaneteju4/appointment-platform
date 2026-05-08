import { UserRole } from '../../infrastructure/database/schemas/auth-user.schema'

export class User {
  constructor(
    public readonly id: string,

    public readonly email: string,

    public passwordHash: string | null,

    public role: UserRole,

    public isEmailVerified: boolean,

    public failedLoginAttempts: number,

    public lockUntil: Date | null,

    public readonly createdAt: Date,

    public readonly updatedAt: Date,

    public lastLoginAt?: Date
  ) {}

  public verifyEmail(): void {
    this.isEmailVerified = true
  }

  public updatePassword(passwordHash: string): void {
    this.passwordHash = passwordHash
  }

  public incrementFailedLoginAttempts(): void {
    this.failedLoginAttempts += 1
  }

  public resetFailedLoginAttempts(): void {
    this.failedLoginAttempts = 0
  }
}
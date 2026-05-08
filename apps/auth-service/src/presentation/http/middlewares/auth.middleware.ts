import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import { verifyAccessToken } from '../../../infrastructure/auth/jwt'

import {
  AppError
} from '@appointment-platform/shared-errors'
export type AuthenticatedRequest =
  FastifyRequest & {
    user: {
      userId: string

      email: string
    }
  }

export const authMiddleware = async (
  request: FastifyRequest,
  _: FastifyReply
): Promise<void> => {
  const authHeader =
    request.headers.authorization

  if (!authHeader) {
    throw new AppError(
      'Unauthorized',
      401
    )
  }

  const [, token] = authHeader.split(' ')

  if (!token) {
    throw new AppError(
      'Unauthorized',
      401
    )
  }

  try {
    const payload =
      verifyAccessToken(token)

    ;(
      request as AuthenticatedRequest
    ).user = payload
  } catch {
    throw new AppError(
      'Unauthorized',
      401
    )
  }
}
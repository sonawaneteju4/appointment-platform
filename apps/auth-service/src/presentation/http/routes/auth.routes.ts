import { FastifyInstance } from 'fastify'

import { AuthController } from '../controllers/auth.controller'

import { authMiddleware } from '../middlewares/auth.middleware'
import {
  AppError
} from '@appointment-platform/shared-errors'
export async function authRoutes(
  app: FastifyInstance
): Promise<void> {
  app.post(
    '/register',
    AuthController.register
  )

 app.post(
  '/login',
  {
    config: {
      rateLimit: {
        max: 5,

        timeWindow: '1 minute'
      }
    }
  },
  AuthController.login
)

  app.get(
  '/me',
  {
    preHandler: authMiddleware
  },
  async (request) => {
    return {
      success: true,

      user: (
        request as any
      ).user
    }
  }
)
app.post(
  '/refresh',
  AuthController.refresh
)

app.post(
  '/logout',
  AuthController.logout
)
}

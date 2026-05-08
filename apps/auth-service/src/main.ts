import Fastify from 'fastify'

import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'

import { env } from './config/env'

import { logger } from './infrastructure/logger/logger'

import { connectMongoDB } from './infrastructure/database/mongodb'

import { connectRedis } from './infrastructure/cache/redis'

import { authRoutes } from './presentation/http/routes/auth.routes'

import { globalErrorHandler } from './shared/errors/global-error-handler'

import { requestContextMiddleware } from './presentation/http/middlewares/request-context.middleware'

import { gracefulShutdown } from './shared/utils/graceful-shutdown'

const app = Fastify({
  logger: {
    level:
      env.NODE_ENV === 'production'
        ? 'info'
        : 'debug',

    transport:
      env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',

            options: {
              colorize: true
            }
          }
        : undefined
  }
})

// Global error handler
app.setErrorHandler(
  globalErrorHandler
)

// -----------------------------
// Health Probes
// -----------------------------

// Liveness probe
app.get(
  '/health/live',
  async () => {
    return {
      service: 'auth-service',

      status: 'alive'
    }
  }
)

// Readiness probe
app.get(
  '/health/ready',
  async () => {
    return {
      service: 'auth-service',

      status: 'ready'
    }
  }
)

const start = async (): Promise<void> => {
  try {
    // -----------------------------
    // Infrastructure Connections
    // -----------------------------

    await connectMongoDB()

    await connectRedis()

    // -----------------------------
    // Plugins
    // -----------------------------

    await app.register(cookie)

    await app.register(
      rateLimit,
      {
        global: false
      }
    )

    // -----------------------------
    // Request Context Middleware
    // -----------------------------

    app.addHook(
      'onRequest',
      requestContextMiddleware
    )

    // -----------------------------
    // Structured Request Logging
    // -----------------------------

    app.addHook(
      'onResponse',
      async (
        request,
        reply
      ) => {
        request.log.info({
          requestId:
            request.headers[
              'x-request-id'
            ],

          method:
            request.method,

          url:
            request.url,

          statusCode:
            reply.statusCode
        })
      }
    )

    // -----------------------------
    // Routes
    // -----------------------------

    await app.register(
      authRoutes,
      {
        prefix:
          '/api/v1/auth'
      }
    )

    // -----------------------------
    // Start Server
    // -----------------------------

    await app.listen({
      port: Number(env.PORT),

      host: '0.0.0.0'
    })

    // -----------------------------
    // Graceful Shutdown
    // -----------------------------

    gracefulShutdown(app)

    logger.info(
      `Auth service running on port ${env.PORT}`
    )
  } catch (error) {
    app.log.error(error)

    process.exit(1)
  }
}

start()
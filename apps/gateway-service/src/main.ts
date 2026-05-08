import Fastify from 'fastify'

import proxy from '@fastify/http-proxy'

import { env } from './config/env'

import { logger } from './infrastructure/logger/logger'

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

// Health
app.get(
  '/health',
  async () => {
    return {
      service: 'gateway-service',

      status: 'ok'
    }
  }
)

// Auth service proxy
app.register(proxy, {
  upstream: env.AUTH_SERVICE_URL,

  prefix: '/api/v1/auth',

  rewritePrefix: '/api/v1/auth'
})

const start =
  async (): Promise<void> => {
    try {
      await app.listen({
        port: env.PORT,

        host: '0.0.0.0'
      })

      logger.info(
        `Gateway running on port ${env.PORT}`
      )
    } catch (error) {
      app.log.error(error)

      process.exit(1)
    }
  }

start()
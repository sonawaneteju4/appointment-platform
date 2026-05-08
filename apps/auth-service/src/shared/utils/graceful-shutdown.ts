import { FastifyInstance } from 'fastify'

import mongoose from 'mongoose'

import { redisClient } from '../../infrastructure/cache/redis'

export const gracefulShutdown = (
  app: FastifyInstance
): void => {
  const shutdown = async (
    signal: string
  ): Promise<void> => {
    app.log.info(
      `${signal} received. Shutting down gracefully...`
    )

    try {
      await app.close()

      await mongoose.connection.close()

      await redisClient.quit()

      app.log.info(
        'Graceful shutdown completed'
      )

      process.exit(0)
    } catch (error) {
      app.log.error(error)

      process.exit(1)
    }
  }

  process.on('SIGINT', () =>
    shutdown('SIGINT')
  )

  process.on('SIGTERM', () =>
    shutdown('SIGTERM')
  )
}
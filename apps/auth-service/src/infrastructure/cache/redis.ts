import { createClient } from 'redis'

import { env } from '../../config/env'
import { logger } from '../logger/logger'

export const redisClient = createClient({
  url: env.REDIS_URL
})

redisClient.on('error', (error) => {
  logger.error(error)
})

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect()

    logger.info('Redis connected successfully')
  } catch (error) {
    logger.error(error)

    process.exit(1)
  }
}
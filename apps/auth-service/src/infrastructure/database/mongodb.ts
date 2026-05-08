import mongoose from 'mongoose'

import { env } from '../../config/env'
import { logger } from '../logger/logger'

export const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI)

    logger.info('MongoDB connected successfully')
  } catch (error) {
    logger.error(error)

    process.exit(1)
  }
}
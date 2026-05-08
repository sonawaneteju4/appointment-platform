import { FastifyReply, FastifyRequest } from 'fastify'

import { logger } from '../../../infrastructure/logger/logger'

import {
  AppError
} from '@appointment-platform/shared-errors'
export const errorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
): void => {
  logger.error(error)

  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      success: false,
      message: error.message
    })

    return
  }

  reply.status(500).send({
    success: false,
    message: 'Internal server error'
  })
}
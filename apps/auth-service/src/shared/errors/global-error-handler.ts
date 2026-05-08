import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import { ZodError } from 'zod'

import {
  AppError
} from '@appointment-platform/shared-errors'

import { errorResponse } from '../utils/api-response'

export const globalErrorHandler = (
  error: Error & {
    statusCode?: number

    code?: string
  },
  _: FastifyRequest,
  reply: FastifyReply
): void => {
  // Application/business errors
  if (error instanceof AppError) {
    reply.status(error.statusCode).send(
      errorResponse(
        error.message,
        error.code
      )
    )

    return
  }

  // Validation errors
  if (error instanceof ZodError) {
    reply.status(400).send({
      success: false,

      message: 'Validation failed',

      code: 'VALIDATION_ERROR',

      errors: error.flatten()
    })

    return
  }

  // Fastify/plugin/framework errors
  if (error.statusCode) {
    reply.status(error.statusCode).send(
      errorResponse(
        error.message,
        error.code
      )
    )

    return
  }

  // Unknown internal errors
  reply.status(500).send(
    errorResponse(
      'Internal server error',
      'INTERNAL_SERVER_ERROR'
    )
  )
}
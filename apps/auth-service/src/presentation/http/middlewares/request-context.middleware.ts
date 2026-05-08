import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import { randomUUID } from 'crypto'

export const requestContextMiddleware =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const requestId =
      (
        request.headers[
          'x-request-id'
        ] as string
      ) || randomUUID()

    request.headers[
      'x-request-id'
    ] = requestId

    reply.header(
      'x-request-id',
      requestId
    )
  }
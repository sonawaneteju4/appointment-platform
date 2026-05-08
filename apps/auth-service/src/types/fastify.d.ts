import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    cookies: {
      refreshToken?: string
    }
  }
}
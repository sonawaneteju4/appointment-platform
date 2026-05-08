import { FastifyReply } from 'fastify'

const REFRESH_TOKEN_COOKIE_NAME =
  'refreshToken'

const REFRESH_TOKEN_COOKIE_MAX_AGE =
  7 * 24 * 60 * 60

export const setRefreshTokenCookie = (
  reply: FastifyReply,
  refreshToken: string
): void => {
  reply.setCookie(
    REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        'production',

      sameSite: 'lax',

      path: '/',

      maxAge:
        REFRESH_TOKEN_COOKIE_MAX_AGE
    }
  )
}

export const clearRefreshTokenCookie = (
  reply: FastifyReply
): void => {
  reply.clearCookie(
    REFRESH_TOKEN_COOKIE_NAME,
    {
      path: '/'
    }
  )
}
import jwt from 'jsonwebtoken'

import { env } from '../../config/env'

import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY
} from '../../shared/constants/auth'

type TokenPayload = {
  userId: string
  email: string
}

export const generateAccessToken = (
  payload: TokenPayload
): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY
  })
}

export const generateRefreshToken = (
  payload: TokenPayload
): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY
  })
}

export const verifyAccessToken = (
  token: string
): TokenPayload => {
  return jwt.verify(
    token,
    env.JWT_ACCESS_SECRET
  ) as TokenPayload
}

export const verifyRefreshToken = (
  token: string
): TokenPayload => {
  return jwt.verify(
    token,
    env.JWT_REFRESH_SECRET
  ) as TokenPayload
}
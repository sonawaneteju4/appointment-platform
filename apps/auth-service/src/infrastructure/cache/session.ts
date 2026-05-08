import { redisClient } from './redis'

const SESSION_PREFIX = 'session:'

const SESSION_TTL = 60 * 60 * 24 * 7

export const storeRefreshSession = async (
  userId: string,
  refreshToken: string
): Promise<void> => {
  await redisClient.set(
    `${SESSION_PREFIX}${userId}`,
    refreshToken,
    {
      EX: SESSION_TTL
    }
  )
}

export const getRefreshSession = async (
  userId: string
): Promise<string | null> => {
  return redisClient.get(
    `${SESSION_PREFIX}${userId}`
  )
}

export const deleteRefreshSession = async (
  userId: string
): Promise<void> => {
  await redisClient.del(
    `${SESSION_PREFIX}${userId}`
  )
}
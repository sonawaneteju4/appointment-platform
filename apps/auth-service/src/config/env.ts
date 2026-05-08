import dotenv from 'dotenv'

import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum([
    'development',
    'production',
    'test'
  ]),

  PORT: z.coerce.number(),

  MONGO_URI: z.url(),

  REDIS_URL: z.url(),

  JWT_ACCESS_SECRET:
    z.string().min(32),

  JWT_REFRESH_SECRET:
    z.string().min(32)
})

const parsedEnv =
  envSchema.safeParse(
    process.env
  )

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.flatten()
  )

  process.exit(1)
}

export const env =
  parsedEnv.data
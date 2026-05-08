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

  AUTH_SERVICE_URL:
    z.url()
})

const parsed =
  envSchema.safeParse(
    process.env
  )

if (!parsed.success) {
  console.error(
    parsed.error.flatten()
  )

  process.exit(1)
}

export const env =
  parsed.data
import z from 'zod'

const envSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)

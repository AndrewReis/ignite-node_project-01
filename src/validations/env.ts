import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  DEV_DATABASE_URL: z.string(),
  TEST_DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333)
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error(`Invalid  environment variables ${JSON.stringify(_env.error.format())}`);
}

export default _env.data
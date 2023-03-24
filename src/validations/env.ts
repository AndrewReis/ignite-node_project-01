import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error(`Invalid  environment variables ${JSON.stringify(_env.error.format())}`);
}

export default _env.data
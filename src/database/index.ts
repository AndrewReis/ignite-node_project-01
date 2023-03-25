import env from "../validations/env";
import { knex as setupKnex, Knex } from "knex";

let connectionMode;

if (env.DATABASE_CLIENT === 'sqlite') {
  connectionMode = {
    filename: env.NODE_ENV === 'test' ? env.TEST_DATABASE_URL : env.DEV_DATABASE_URL
  }
} else {
  connectionMode = env.DATABASE_URL
}


export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: connectionMode,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations'
  }
}

export const connection = setupKnex(config);  
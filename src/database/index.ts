import env from "../validations/env";
import { knex as setupKnex, Knex } from "knex";

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.NODE_ENV === 'test' ? env.TEST_DATABASE_URL : env.DEV_DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations'
  }
}

export const connection = setupKnex(config);  
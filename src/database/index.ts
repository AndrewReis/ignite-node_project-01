import env from "../validations/env";
import { knex as setupKnex, Knex } from "knex";

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './tmp/migrations'
  }
}

export const connection = setupKnex(config);  
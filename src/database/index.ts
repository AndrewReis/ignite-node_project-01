import Knex from "knex";

export const connection = Knex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db'
  },
  useNullAsDefault: false
});  
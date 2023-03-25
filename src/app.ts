import fastify from "fastify";
import cookie  from '@fastify/cookie';

import { connection } from "./database";

import { transactionRoutes } from "./routes/transactions.routes";

export const app = fastify();

app.register(cookie);
app.register(transactionRoutes);

app.get('/hello', async () => {
  const tables = await connection('sqlite_schema').select('*');
  return tables;
});

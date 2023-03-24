import fastify from "fastify";
import cookie from '@fastify/cookie';

import { connection } from "./database";

import { transactionRoutes } from "./routes/transactions.routes";

import env from "./validations/env";

const app = fastify();

app.register(cookie);
app.register(transactionRoutes);

app.get('/hello', async () => {
  const tables = await connection('sqlite_schema').select('*');
  return tables;
});

app.listen({
  port: Number(env.PORT)
}).then(() => console.log('Server running on Port 3333'))
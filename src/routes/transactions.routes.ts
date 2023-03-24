import { FastifyInstance } from "fastify";
import crypto from 'node:crypto';
import { z } from "zod";

import { connection } from "../database";
import { checkSessionIdExist } from "../middlewares/check-session-id-exists";

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/transactions', { preHandler: [checkSessionIdExist] }, async (req) => {
    const sessionId = req.cookies.sessionId;

    const transactions = await connection('transactions')
      .select('*')
      .where('session_id', sessionId);

    return { transactions };
  });

  app.get('/transactions/:id', { preHandler: [checkSessionIdExist] }, async (req, reply) => {
    const transactionRequest = z.object({
      id: z.string().uuid(),
    });

    const sessionId = req.cookies.sessionId;
    const { id }    = transactionRequest.parse(req.params);

    const transaction = await connection('transactions')
      .select('*')
      .where('id', id)
      .andWhere('session_id', sessionId)
      .first();

    return { transaction };
  });

  app.get('/transactions/summary', { preHandler: [checkSessionIdExist] }, async (req) => {
    const sessionId = req.cookies.sessionId;

    const summary = await connection('transactions')
      .sum('amount', { as: 'amount' })
      .where('session_id', sessionId)
      .first();

    return { summary };
  });

  app.post('/create-transaction', async (req, reply) => {
    const transactionRequest = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    });

    const { title, amount, type } = transactionRequest.parse(req.body);

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      reply.cookie('sessionId', sessionId, {
        path: '/',
        // miliseconds, seconds, minutes, hours and days
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      })
    }

    await connection('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId
    })

    return reply.status(201).send();
  });
}
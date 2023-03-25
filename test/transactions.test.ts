import { execSync } from 'node:child_process'
import request      from 'supertest';
import {
  describe,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  it,
  expect
} from 'vitest';


import { app } from '../src/app';

import env from '../src/validations/env';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    if (env.NODE_ENV === 'test') {
      execSync('npm run knex migrate:latest');
    }
  });

  afterEach(() => {
    if (env.NODE_ENV === 'test') {
      execSync('npm run knex migrate:rollback --all');
    }
  });

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 5000,
        type: 'credit'
      });

    expect(response.statusCode).toEqual(201)
  });

  it('should be able to list all transactions', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 5000,
        type: 'credit'
      });

    const cookies = response.get('Set-Cookie');

    const transactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    expect(transactions.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Test Transaction',
        amount: 5000
      })
    ]);
  });

  it('should be able to get a specific transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 5000,
        type: 'credit'
      });

    const cookies = response.get('Set-Cookie');

    const getAllTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    const transactionId = getAllTransactionsResponse.body.transactions[0].id;

    const getSpecificTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200);

    expect(getSpecificTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Test Transaction',
        amount: 5000
      })
    );
  });

  it('should be able to get summary', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transaction',
        amount: 5000,
        type: 'credit'
      });

    const cookies = response.get('Set-Cookie');

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Test Transaction',
        amount: 2000,
        type: 'debit'
      });

    const getSummaryResponse = await request(app.server)
      .get(`/transactions/summary`)
      .set('Cookie', cookies)
      .expect(200);

    expect(getSummaryResponse.body.summary).toEqual(
      expect.objectContaining({
        amount: 3000
      })
    );
  });
});
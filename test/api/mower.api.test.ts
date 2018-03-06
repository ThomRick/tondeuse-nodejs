import { expect } from 'chai';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as request from 'supertest';
import { MowerApi } from '../../src/api/mower.api';

describe('Mower API', () => {
  it('should expose POST /api/mowers', async () => {
    const router = new Router();
    const api = new MowerApi(router);
    expect(api).to.exist;

    const server = new Koa();
    server.use(router.routes());

    const response = await request(server.callback())
      .post('/api/mowers')
      .send({});

    expect(response.status).to.be.equal(201);
  });
});

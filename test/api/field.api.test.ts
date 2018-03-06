import { expect } from 'chai';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as request from 'supertest';
import { FieldApi } from '../../src/api/field.api';

describe('Field API', () => {
  it('should expose POST /api/field endpoint', async () => {
    const router = new Router();
    const api = new FieldApi(router);
    expect(api).to.exist;

    const server = new Koa();
    server.use(router.routes());

    const response = await request(server.callback())
      .post('/api/field')
      .send({});

    expect(response.status).to.be.equal(201);
  });
});

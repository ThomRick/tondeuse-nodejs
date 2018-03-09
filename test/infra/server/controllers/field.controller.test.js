const chai = require('chai');
chai.should();
const Koa = require('koa');
const request = require('supertest');

const FieldController = require('../../../../src/infra/server/controllers/field.controller');

describe('Field Controller', () => {
  it('should expose POST /api/fields endpoint when loaded', async () => {
    const controller = FieldController.load();

    const server = new Koa();
    server.use(controller.routes());

    const response = await request(server.callback())
      .post('/api/fields')
      .send({});

    response.status.should.be.equal(201);
  });
});

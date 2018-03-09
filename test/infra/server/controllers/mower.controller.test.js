const chai = require('chai');
chai.should();
const Koa = require('koa');
const request = require('supertest');

const MowerController = require('../../../../src/infra/server/controllers/mower.controller');

describe('Mower Controller', () => {
  it('should expose POST /api/mowers endpoint when loaded', async () => {
    const controller = MowerController.load();
    const server = new Koa();
    server.use(controller.routes());
    const response = await request(server.callback())
      .post('/api/mowers')
      .send({});
    response.status.should.be.equal(201);
  });
});

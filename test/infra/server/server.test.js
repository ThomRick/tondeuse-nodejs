const chai = require('chai');
chai.should();
const request = require('supertest');

describe('MowIT Web API Server', () => {
  let server;
  before(() => server = require('../../../src/infra/server/server'));
  it('should expose POST /api/fields endpoint', async () => {
    const response = await request(server.callback())
      .post('/api/fields')
      .send({});
    response.status.should.be.equal(201);
  });
  it('should expose POST /api/mowers endpoint', async () => {
    const response = await request(server.callback())
      .post('/api/mowers')
      .send({});
    response.status.should.be.equal(201);
  });
  it('should expose POST /api/instructions endpoint', async () => {
    const response = await request(server.callback())
      .post('/api/instructions')
      .send({});
    response.status.should.be.equal(201);
  });
});
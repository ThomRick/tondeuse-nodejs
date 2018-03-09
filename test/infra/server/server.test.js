const chai = require('chai');
chai.should();
const request = require('supertest');

describe('MowIT Web API Server', () => {
  it('should expose POST /api/fields endpoint when bootstrap', async () => {
    const server = require('../../../src/infra/server/server');
    const response = await request(server.callback())
      .post('/api/fields')
      .send({});
    response.status.should.be.equal(201);
  });
  it('should expose POST /api/mowers endpoint when loaded', async () => {
    const server = require('../../../src/infra/server/server');
    const response = await request(server.callback())
      .post('/api/mowers')
      .send({});
    response.status.should.be.equal(201);
  });
});
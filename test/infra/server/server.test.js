const chai = require('chai');
chai.should();
const request = require('supertest');

describe('MowIT Web API Server', () => {
  let server;
  beforeEach(() => server = require('../../../src/infra/server/server'));
  it('should expose POST /api/fields endpoint to create fields', async () => {
    const response = await request(server.callback())
      .post('/api/fields')
      .send({
        dimension: {
          width: 4,
          length: 4
        }
      });
    response.status.should.be.equal(201);
    response.body.should.have.property('id');
    response.body.should.have.deep.property('dimension', {
      width: 4,
      length: 4
    });
    response.body.should.not.have.property('uncommittedChanges');
  });
  it('should expose GET /api/fields endpoint to fetch all fields', async () => {
    const response = await request(server.callback()).get('/api/fields');
    response.status.should.be.equal(200);
    response.body.should.be.an('array');
  });
  it('should expose POST /api/mowers endpoint to create mowers', async () => {
    const response = await request(server.callback())
      .post('/api/mowers')
      .send({
        position: {
          x: 0,
          y: 0
        },
        orientation: 'N'
      });
    response.status.should.be.equal(201);
    response.body.should.have.property('id');
    response.body.should.have.deep.property('position', {
      x: 0,
      y: 0
    });
    response.body.should.have.deep.property('orientation', 'N');
  });
  it('should expose GET /api/mowers endpoint to fetch all mowers', async () => {
    const response = await request(server.callback()).get('/api/mowers');
    response.status.should.be.equal(200);
    response.body.should.be.an('array');
  });
  it('should expose POST /api/programs endpoint to create programs', async () => {
    const response = await request(server.callback()).post('/api/programs');
    response.status.should.be.equal(201);
  });
});
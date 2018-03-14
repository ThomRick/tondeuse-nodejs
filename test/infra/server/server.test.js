const chai = require('chai');
chai.should();
const sinon = require('sinon');
const request = require('supertest');

const Field = require('../../../src/domain/aggregates/field/field');
const Dimension = require('../../../src/domain/aggregates/field/dimension');

const MoveMowerHandler = require('../../../src/domain/handlers/mower/move-mower.handler');

const DeployMowerHandler = require('../../../src/domain/handlers/field/deploy-mower.handler');

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
    response.body.should.have.deep.property('mowers', []);
    response.body.should.not.have.property('uncommittedChanges');
  });
  it('should expose GET /api/fields endpoint to fetch all fields', async () => {
    const response = await request(server.callback())
      .get('/api/fields');
    response.status.should.be.equal(200);
    response.body.should.be.an('array');
  });
  it('should expose PUT /api/fields/:id endpoint to deploy mower', async () => {
    const sandbox = sinon.sandbox.create();
    const field = Field.Builder().withDimension(Dimension.of(4, 4)).build();
    sandbox.stub(DeployMowerHandler.prototype, 'deploy')
      .callsFake((id, mower) =>
        Promise.resolve(Field.Builder().withId(field.getId()).withDimension(Dimension.of(4, 4)).withMowers([ mower ]).build())
      );
    const response = await request(server.callback())
      .put(`/api/fields/${ field.getId().getValue() }`)
      .send({
        position: {
          x: 0,
          y: 0
        },
        orientation: 'N'
      });
    response.status.should.be.equal(200);
    response.body.should.be.deep.equal({
      id: field.getId().getValue(),
      dimension: {
        width: 4,
        length: 4
      },
      mowers: [
        {
          position: {
            x: 0,
            y: 0
          },
          orientation: 'N'
        }
      ]
    });
    sandbox.restore();
  });
  it('should expose POST /api/mowers endpoint to create mowers', async () => {
    const response = await request(server.callback())
      .post('/api/mowers')
      .send({
        position: {
          x: 0,
          y: 0
        },
        orientation: 'N',
        field: {
          id: 'fieldId'
        }
      });
    response.status.should.be.equal(201);
    response.body.should.have.property('id');
    response.body.should.have.deep.property('position', {
      x: 0,
      y: 0
    });
    response.body.should.have.deep.property('orientation', 'N');
    response.body.should.have.deep.property('field', {
      id: 'fieldId'
    });
  });
  it('should expose PUT /api/mowers/:id endpoint to execute a mower move', async () => {
    const sandbox = sinon.sandbox.create();
    const moveStub = sandbox.stub(MoveMowerHandler.prototype, 'move');
    const response = await request(server.callback())
      .put('/api/mowers/id')
      .send({
        instruction: 'A'
      });
    response.status.should.be.equal(200);
    sandbox.assert.calledWith(moveStub, 'id', 'A');
    sandbox.restore();
  });
  it('should expose POST /api/programs endpoint to create programs', async () => {
    const response = await request(server.callback())
      .post('/api/programs')
      .send({
        instructions: [ 'D', 'A', 'G', 'A', 'G' ],
        mower: {
          id: 'mowerId'
        }
      });
    response.status.should.be.equal(201);
    response.body.should.have.property('id');
    response.body.should.have.deep.property('instructions', [ 'D', 'A', 'G', 'A', 'G' ]);
    response.body.should.have.deep.property('mower', { id: 'mowerId' });
  });
  it('should expose GET /api/programs endpoint to fetch all programs', async () => {
    const response = await request(server.callback())
      .get('/api/programs');
    response.status.should.be.equal(200);
    response.body.should.be.an('array');
  });
  it('should expose PUT /api/programs/:id endpoint to update the program', async () => {
    const response = await request(server.callback())
      .put('/api/programs/id')
      .send({});
    response.status.should.be.equal(200);
  });
});
const chai = require('chai');
chai.should();
const sinon = require('sinon');
const request = require('supertest');

const Field = require('../../../src/domain/aggregates/field/field');
const Dimension = require('../../../src/domain/aggregates/field/dimension');

const DeployMowerHandler = require('../../../src/domain/handlers/field/deploy-mower.handler');

const InstallProgramHandler = require('../../../src/domain/handlers/mower/install-program.handler');
const MoveMowerHandler = require('../../../src/domain/handlers/mower/move-mower.handler');

const RunProgramHandler = require('../../../src/domain/handlers/program/run-program.handler');

describe('MowIT Web API Server', () => {
  let sandbox;
  let server;
  beforeEach(() => {
    server = require('../../../src/infra/server/server');
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });
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
    const field = Field.Builder().withDimension(Dimension.of(4, 4)).build();
    sandbox.stub(DeployMowerHandler.prototype, 'deploy')
      .callsFake((id, mower) => Promise.resolve(
        Field.Builder()
          .withId(field.getId())
          .withDimension(Dimension.of(4, 4))
          .withMowers([ mower ])
          .build()
      ));
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
  it('should expose PUT /api/mowers/:id?action=move endpoint to execute a mower move', async () => {
    const moveStub = sandbox.stub(MoveMowerHandler.prototype, 'move');
    const response = await request(server.callback())
      .put('/api/mowers/id?action=move')
      .send({
        instruction: 'A'
      });
    response.status.should.be.equal(200);
    sandbox.assert.calledWith(moveStub, 'id', 'A');
  });
  it('should expose PUT /api/mowers/:id?action=install endpoint to install a new program on the mower', async () => {
    const installStub = sandbox.stub(InstallProgramHandler.prototype, 'install');
    const response = await request(server.callback())
      .put('/api/mowers/id?action=install')
      .send({
        instructions: [ 'D', 'A', 'G', 'A', 'G' ]
      });
    response.status.should.be.equal(200);
    sandbox.assert.calledWith(installStub,
      'id',
      {
        instructions: [ 'D', 'A', 'G', 'A', 'G' ]
      }
    );
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
  it('should expose PUT /api/programs/:id endpoint to run the program and return an execution report', async () => {
    const runStub = sandbox.stub(RunProgramHandler.prototype, 'run')
      .callsFake(() => Promise.resolve());
    const response = await request(server.callback())
      .put('/api/programs/id');
    response.status.should.be.equal(200);
    sandbox.assert.calledWith(runStub, 'id');
  });
});
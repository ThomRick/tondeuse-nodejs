const chai = require('chai');
chai.should();
const sinon = require('sinon');

const request = require('request');

const Field = require('../../../../src/domain/aggregates/field/field');
const Dimension = require('../../../../src/domain/aggregates/field/dimension');

const InMemoryFieldRepository = require('../../../../src/infra/database/in-memory-field.repository');

const DeployMowerHandler = require('../../../../src/domain/handlers/field/deploy-mower.handler');

describe('Deploy Mower Handler', () => {
  let sandbox;
  let handler;
  let repository;
  beforeEach(() => {
    repository = new InMemoryFieldRepository();
    handler = new DeployMowerHandler(repository);
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should call the mower service to create the mower', async () => {
    const field = Field.Builder().withDimension(Dimension.of(4, 4)).build();
    repository.save(field);
    const mower = {
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N',
      field: field.getId().getValue()
    };
    const postStub = sandbox.stub(request, 'post')
      .callsFake((url, body, callback) => callback(null, {}, Object.assign(mower, { id: 'mowerId' })));
    await handler.deploy(field.getId().getValue(), mower);
    sandbox.assert.calledWith(postStub, '/api/mowers', mower);
  });
  it('should add the new created mower into the field', async () => {
    const field = Field.Builder().withDimension(Dimension.of(4, 4)).build();
    repository.save(field);
    const mower = {
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N',
      field: field.getId().getValue()
    };
    sandbox.stub(request, 'post')
      .callsFake((url, body, callback) => callback(null, {}, Object.assign(mower, { id: 'mowerId' })));
    await handler.deploy(field.getId().getValue(), mower);
    const affectedField = repository.get(field.getId().getValue());
    affectedField.getMowers().should.be.deep.equal([
      {
        id: 'mowerId',
        position: {
          x: 0,
          y: 0
        },
        orientation: 'N',
        field: field.getId().getValue()
      }
    ]);
  });
});

const chai = require('chai');
chai.should();

const Dimension = require('../../../../src/domain/aggregates/field/dimension');

const CreateFieldHandler = require('../../../../src/domain/handlers/field/create-field.handler');
const InMemoryFieldRepository = require('../../../../src/infra/database/in-memory-field.repository');

describe('Create Field Handler', () => {
  let handler;
  let repository;
  before(() => {
    repository = new InMemoryFieldRepository();
    handler = new CreateFieldHandler(repository);
  });
  it('should should save the created field into the database', () => {
    const createdField = handler.create(Dimension.of(4, 4));
    const savedField = repository.get(createdField.getId().getValue());
    savedField.getDimension().should.be.deep.equal(createdField.getDimension());
  });
});

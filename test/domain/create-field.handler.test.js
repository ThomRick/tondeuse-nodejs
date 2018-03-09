const chai = require('chai');
chai.should();

const Dimension = require('../../src/domain/aggregate/dimension');

const CreateFieldHandler = require('../../src/domain/create-field.handler');
const InMemoryFieldRepository = require('../../src/infra/database/in-memory-field.repository');

describe('Create Field Handler', () => {
  let createFieldHandler;
  let fieldRepository;
  before(() => {
    fieldRepository = new InMemoryFieldRepository();
    createFieldHandler = new CreateFieldHandler(fieldRepository);
  });
  it('should should save the created field into the database', () => {
    const createdField = createFieldHandler.createField(Dimension.of(4, 4));
    const savedField = fieldRepository.get(createdField.getId());
    savedField.getDimension().should.be.deep.equal(createdField.getDimension());
  });
});

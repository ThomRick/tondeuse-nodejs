const chai = require('chai');
chai.should();

const Field = require('../../src/domain/aggregate/field');
const Dimension = require('../../src/domain/aggregate/dimension');

const InMemoryFieldRepository = require('../../src/infra/database/in-memory-field.repository');
const ExtractFieldHandler = require('../../src/domain/extract-field.handler');

describe('Extract Field Handler', () => {
  let extractFieldHandler;
  let fieldRepository;
  before(() => {
    fieldRepository = new InMemoryFieldRepository();
    extractFieldHandler = new ExtractFieldHandler(fieldRepository);
  });
  it('should retrieve all stored fields when extractAll', () => {
    [
      Field.Builder().withDimension(Dimension.of(1, 1)).build(),
      Field.Builder().withDimension(Dimension.of(2, 2)).build(),
      Field.Builder().withDimension(Dimension.of(3, 3)).build(),
    ].forEach((field) => fieldRepository.save(field));
    const extractedFields = extractFieldHandler.extractAll();
    extractedFields[0].getDimension().should.be.deep.equal(Dimension.of(1, 1));
    extractedFields[1].getDimension().should.be.deep.equal(Dimension.of(2, 2));
    extractedFields[2].getDimension().should.be.deep.equal(Dimension.of(3, 3));
  });
});

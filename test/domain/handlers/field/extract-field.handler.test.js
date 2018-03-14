const chai = require('chai');
chai.should();

const Field = require('../../../../src/domain/aggregates/field/field');
const Dimension = require('../../../../src/domain/aggregates/field/dimension');

const InMemoryFieldRepository = require('../../../../src/infra/database/in-memory-field.repository');
const ExtractFieldHandler = require('../../../../src/domain/handlers/field/extract-field.handler');

describe('Extract Field Handler', () => {
  let handler;
  let repository;
  before(() => {
    repository = new InMemoryFieldRepository();
    handler = new ExtractFieldHandler(repository);
  });
  it('should retrieve all stored fields when extract without id', () => {
    [
      Field.Builder().withDimension(Dimension.of(1, 1)).build(),
      Field.Builder().withDimension(Dimension.of(2, 2)).build(),
      Field.Builder().withDimension(Dimension.of(3, 3)).build(),
    ].forEach((field) => repository.save(field));
    const extractedFields = handler.extract();
    extractedFields[0].getDimension().should.be.deep.equal(Dimension.of(1, 1));
    extractedFields[1].getDimension().should.be.deep.equal(Dimension.of(2, 2));
    extractedFields[2].getDimension().should.be.deep.equal(Dimension.of(3, 3));
  });
  it('should retrieve all stored fields when extract with id', () => {
    const fields = [
      Field.Builder().withDimension(Dimension.of(1, 1)).build(),
      Field.Builder().withDimension(Dimension.of(2, 2)).build(),
      Field.Builder().withDimension(Dimension.of(3, 3)).build(),
    ];
    fields.forEach((field) => repository.save(field));
    const extractedField = handler.extract(fields[0].getId().getValue());
    extractedField.getDimension().should.be.deep.equal(Dimension.of(1, 1));
  });
});

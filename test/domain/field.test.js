const chai = require('chai');
chai.should();

const Field = require('../../src/domain/field');
const Dimension = require('../../src/domain/dimension');

const NewFieldCreated = require('../../src/domain/events/new-field-created.event');

describe('Field', () => {
  it('should have the specified dimensions and no mowers when created with dimension', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(5, 5))
      .build();
    field.getDimension().should.be.deep.equal(Dimension.of(5, 5));
  });
  it('should fail if no dimension is specified', () => {
    (() => Field.Builder().build()).should.throw('Dimension must be specified');
  });
  it('should add creation event when creating field', () => {
    const field = Field.Builder().withDimension(Dimension.of(5, 5)).build();
    field.getUncommittedChanges()
      .should.be.an('array')
      .that.is.deep.equal([
        new NewFieldCreated(field.getId(), field.getDimension())
      ]);
  });
});

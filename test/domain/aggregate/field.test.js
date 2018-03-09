const chai = require('chai');
chai.should();

const Field = require('../../../src/domain/aggregate/field');
const FieldId = require('../../../src/domain/aggregate/fieldId');
const Dimension = require('../../../src/domain/aggregate/dimension');

const NewFieldCreated = require('../../../src/domain/aggregate/events/new-field-created.event');

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
  it('should rebuild field from events', () => {
    const id = FieldId.create();
    const events = [
      new NewFieldCreated(id, Dimension.of(5, 5))
    ];
    const field = Field.rebuild(events);
    field.getId().should.be.deep.equal(id);
    field.getDimension().should.be.deep.equal(Dimension.of(5, 5));
  });
});

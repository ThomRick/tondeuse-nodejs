const chai = require('chai');
chai.should();

const Field = require('../../../src/domains/field/field');
const FieldDimension = require('../../../src/domains/field/dimension');

describe('Field', () => {
  it('should have the specified dimensions and no mowers when created with dimension', () => {
    const field = Field
      .Builder()
      .withDimension(FieldDimension.of(5, 5))
      .build();
    field.getDimension().should.be.deep.equal(FieldDimension.of(5, 5));
  });
  it('should fail if no dimension is specified', () => {
    (() => Field.Builder().build()).should.throw('Dimension must be specified');
  });
});

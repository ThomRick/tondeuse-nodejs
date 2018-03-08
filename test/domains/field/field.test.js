const chai = require('chai');
chai.should();

const Field = require('../../../src/domains/field/field');
const FieldDimension = require('../../../src/domains/field/dimension');

describe('Field', () => {
  it('should have the specified dimensions when created with dimensions', () => {
    const field = Field.withDimension(FieldDimension.of(5, 5));
    field.getDimension().should.be.deep.equal(FieldDimension.of(5, 5));
  });
});

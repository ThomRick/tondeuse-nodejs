const chai = require('chai');
chai.should();

const Field = require('../../../src/domains/field/field');

describe('Field', () => {
  it('should have no mowers when field created as empty', () => {
    const field = Field.empty();
    field.getMowers().should.be.an('array').that.is.empty;
  });
});

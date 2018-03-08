const chai = require('chai');
chai.should();

const Field = require('../../../src/domains/field/field');
const FieldDimension = require('../../../src/domains/field/dimension');

const Mower = require('../../../src/domains/mower/mower');
const MowerId = require('../../../src/domains/mower/mowerId');
const MowerPosition = require('../../../src/domains/mower/position');
const MowerOrientation = require('../../../src/domains/mower/orientation');

describe('Field', () => {
  it('should have the specified dimensions and no mowers when created with dimension', () => {
    const field = Field
      .Builder()
      .withDimension(FieldDimension.of(5, 5))
      .build();
    field.getDimension().should.be.deep.equal(FieldDimension.of(5, 5));
    field.getMowers().should.be.an('array').that.is.empty;
  });
  it('should have the specified mowers when created with mowers', () => {
    const mowerId = MowerId.create();
    const field = Field
      .Builder()
      .withDimension(FieldDimension.of(5, 5))
      .withMowers([
        Mower.Builder().withId(mowerId).withPosition(MowerPosition.at(0, 0)).withOrientation(MowerOrientation.NORTH).build()
      ])
      .build();
    field.getMowers().should.be.an('array').that.is.deep.equal([
      Mower.Builder().withId(mowerId).withPosition(MowerPosition.at(0, 0)).withOrientation(MowerOrientation.NORTH).build()
    ]);
  });
  it('should fail if no dimension is specified', () => {
    (() => Field.Builder().build()).should.throw('Dimension must be specified');
  });
});

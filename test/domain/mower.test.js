const chai = require('chai');
chai.should();

const Field = require('../../src/domain/field');
const FieldDimension = require('../../src/domain/dimension');

const Mower = require('../../src/domain/mower');
const Orientation = require('../../src/domain/orientation');
const Position = require('../../src/domain/position');

describe('Mower', () => {
  it('should have a { 0, 0 } position and be North oriented when created as default', () => {
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    mower.getPosition().should.be.deep.equal(Position.at(0, 0));
    mower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
  });
  it('should fail if no position is specified', () => {
    (() => Mower.Builder().withOrientation(Orientation.from(Orientation.NORTH)).build()).should.throw('Position must be specified');
  });
  it('should fail if no orientation is specified', () => {
    (() => Mower.Builder().withPosition(Position.at(0, 0)).build()).should.throw('Orientation must be specified');
  });
  it('should have a field when it is been place on', () => {
    const field = Field.Builder().withDimension(FieldDimension.of(5, 5)).build();
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    mower.placeOn(field);
    mower.getField().should.be.deep.equal(field);
  });
});

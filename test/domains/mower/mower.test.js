const chai = require('chai');
chai.should();

const Mower = require('../../../src/domains/mower/mower');
const MowerOrientation = require('../../../src/domains/mower/orientation');
const MowerPosition = require('../../../src/domains/mower/position');

describe('Mower', () => {
  it('should have a { 0, 0 } position and be North oriented when created as default', () => {
    const mower = Mower
      .Builder()
      .withPosition(MowerPosition.at(0, 0))
      .withOrientation(MowerOrientation.NORTH)
      .build();
    mower.getPosition().should.be.deep.equal(MowerPosition.at(0, 0));
    mower.getOrientation().should.be.deep.equal(MowerOrientation.NORTH);
  });
  it('should fail if no position is specified', () => {
    (() => Mower.Builder().withOrientation(MowerOrientation.NORTH).build()).should.throw('Position must be specified');
  });
  it('should fail if no orientation is specified', () => {
    (() => Mower.Builder().withPosition(MowerPosition.at(0, 0)).build()).should.throw('Orientation must be specified');
  });
});

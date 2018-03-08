const chai = require('chai');
chai.should();

const MowerOrientation = require('../../../src/domains/mower/orientation');

describe('MowerOrientation', () => {
  it('should return EAST for NORTH current position when right is called', () => {
    const orientation = MowerOrientation.NORTH;
    orientation.right().should.be.deep.equal(MowerOrientation.EST);
  });
  it('should return SOUTH for EAST current position when right is called', () => {
    const orientation = MowerOrientation.EST;
    orientation.right().should.be.deep.equal(MowerOrientation.SOUTH);
  });
  it('should return WEST for SOUTH current position when right is called', () => {
    const orientation = MowerOrientation.SOUTH;
    orientation.right().should.be.deep.equal(MowerOrientation.WEST);
  });
  it('should return NORTH for WEST current position when right is called', () => {
    const orientation = MowerOrientation.WEST;
    orientation.right().should.be.deep.equal(MowerOrientation.NORTH);
  });
  it('should return WEST for NORTH current position when left is called', () => {
    const orientation = MowerOrientation.NORTH;
    orientation.left().should.be.deep.equal(MowerOrientation.WEST);
  });
  it('should return NORTH for EAST current position when left is called', () => {
    const orientation = MowerOrientation.EST;
    orientation.left().should.be.deep.equal(MowerOrientation.NORTH);
  });
  it('should return EST for SOUTH current position when left is called', () => {
    const orientation = MowerOrientation.SOUTH;
    orientation.left().should.be.deep.equal(MowerOrientation.EST);
  });
  it('should return SOUTH for WEST current position when left is called', () => {
    const orientation = MowerOrientation.WEST;
    orientation.left().should.be.deep.equal(MowerOrientation.SOUTH);
  });
});

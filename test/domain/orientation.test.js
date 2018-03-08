const chai = require('chai');
chai.should();

const Orientation = require('../../src/domain/orientation');

describe('Orientation', () => {
  it('should return EAST for NORTH current position when right is called', () => {
    const orientation = Orientation.NORTH;
    orientation.right().should.be.deep.equal(Orientation.EST);
  });
  it('should return SOUTH for EAST current position when right is called', () => {
    const orientation = Orientation.EST;
    orientation.right().should.be.deep.equal(Orientation.SOUTH);
  });
  it('should return WEST for SOUTH current position when right is called', () => {
    const orientation = Orientation.SOUTH;
    orientation.right().should.be.deep.equal(Orientation.WEST);
  });
  it('should return NORTH for WEST current position when right is called', () => {
    const orientation = Orientation.WEST;
    orientation.right().should.be.deep.equal(Orientation.NORTH);
  });
  it('should return WEST for NORTH current position when left is called', () => {
    const orientation = Orientation.NORTH;
    orientation.left().should.be.deep.equal(Orientation.WEST);
  });
  it('should return NORTH for EAST current position when left is called', () => {
    const orientation = Orientation.EST;
    orientation.left().should.be.deep.equal(Orientation.NORTH);
  });
  it('should return EST for SOUTH current position when left is called', () => {
    const orientation = Orientation.SOUTH;
    orientation.left().should.be.deep.equal(Orientation.EST);
  });
  it('should return SOUTH for WEST current position when left is called', () => {
    const orientation = Orientation.WEST;
    orientation.left().should.be.deep.equal(Orientation.SOUTH);
  });
});

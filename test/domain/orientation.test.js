const chai = require('chai');
chai.should();

const Orientation = require('../../src/domain/orientation');

describe('Orientation', () => {
  it('should return EAST for NORTH current position when right is called', () => {
    const orientation = Orientation.from(Orientation.NORTH);
    orientation.right().should.be.deep.equal(Orientation.from(Orientation.EST));
  });
  it('should return SOUTH for EAST current position when right is called', () => {
    const orientation = Orientation.from(Orientation.EST);
    orientation.right().should.be.deep.equal(Orientation.from(Orientation.SOUTH));
  });
  it('should return WEST for SOUTH current position when right is called', () => {
    const orientation = Orientation.from(Orientation.SOUTH);
    orientation.right().should.be.deep.equal(Orientation.from(Orientation.WEST));
  });
  it('should return NORTH for WEST current position when right is called', () => {
    const orientation = Orientation.from(Orientation.WEST);
    orientation.right().should.be.deep.equal(Orientation.from(Orientation.NORTH));
  });
  it('should return WEST for NORTH current position when left is called', () => {
    const orientation = Orientation.from(Orientation.NORTH);
    orientation.left().should.be.deep.equal(Orientation.from(Orientation.WEST));
  });
  it('should return NORTH for EAST current position when left is called', () => {
    const orientation = Orientation.from(Orientation.EST);
    orientation.left().should.be.deep.equal(Orientation.from(Orientation.NORTH));
  });
  it('should return EST for SOUTH current position when left is called', () => {
    const orientation = Orientation.from(Orientation.SOUTH);
    orientation.left().should.be.deep.equal(Orientation.from(Orientation.EST));
  });
  it('should return SOUTH for WEST current position when left is called', () => {
    const orientation = Orientation.from(Orientation.WEST);
    orientation.left().should.be.deep.equal(Orientation.from(Orientation.SOUTH));
  });
});

const chai = require('chai');
chai.should();

const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

describe('Position', () => {
  it('should move to the NORTH', () => {
    const position = Position.at(0, 0);
    position.move(Orientation.from(Orientation.NORTH))
      .should.be.deep.equal(Position.at(1, 0));
  });
  it('should move to the SOUTH', () => {
    const position = Position.at(1, 0);
    position.move(Orientation.from(Orientation.SOUTH))
      .should.be.deep.equal(Position.at(0, 0));
  });
  it('should move to the EAST', () => {
    const position = Position.at(0, 0);
    position.move(Orientation.from(Orientation.EST))
      .should.be.deep.equal(Position.at(0, 1));
  });
  it('should move to the WEST', () => {
    const position = Position.at(0, 1);
    position.move(Orientation.from(Orientation.WEST))
      .should.be.deep.equal(Position.at(0, 0));
  });
});

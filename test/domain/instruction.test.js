const chai = require('chai');
chai.should();

const Instruction = require('../../src/domain/instruction');

const Mower = require('../../src/domain/mower');
const Position = require('../../src/domain/position');
const Orientation = require('../../src/domain/orientation');

const Field = require('../../src/domain/field');
const Dimension = require('../../src/domain/dimension');

describe('Instruction', () => {
  it('should update the position to x + 1 when move forward instruction is applied on a north oriented mower', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(4, 4))
      .build();
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    mower.placeOn(field);
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    instruction.applyOn(mower).getPosition().should.be.deep.equal(Position.at(1, 0));
  });
  it('should update the position to y + 1 when move forward instruction is applied on a est oriented mower', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(4, 4))
      .build();
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.EST))
      .build();
    mower.placeOn(field);
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    instruction.applyOn(mower).getPosition().should.be.deep.equal(Position.at(0, 1));
  });
  it('should update the position to x - 1 when move forward instruction is applied on a south oriented mower', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(4, 4))
      .build();
    const mower = Mower
      .Builder()
      .withPosition(Position.at(4, 4))
      .withOrientation(Orientation.from(Orientation.SOUTH))
      .build();
    mower.placeOn(field);
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    instruction.applyOn(mower).getPosition().should.be.deep.equal(Position.at(3, 4));
  });
  it('should update the position to y - 1 when move forward instruction is applied on a west oriented mower', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(4, 4))
      .build();
    const mower = Mower
      .Builder()
      .withPosition(Position.at(4, 4))
      .withOrientation(Orientation.from(Orientation.WEST))
      .build();
    mower.placeOn(field);
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    instruction.applyOn(mower).getPosition().should.be.deep.equal(Position.at(4, 3));
  });
  it('should update the orientation to the left when turn left instruction is applied', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(4, 4))
      .build();
    const mower = Mower
      .Builder()
      .withPosition(Position.at(4, 4))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    mower.placeOn(field);
    const instruction = Instruction.from(Instruction.TURN_LEFT);
    instruction.applyOn(mower).getOrientation().should.be.deep.equal(Orientation.from(Orientation.WEST));
  });
  it('should update the orientation to the right when turn right instruction is applied', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(4, 4))
      .build();
    const mower = Mower
      .Builder()
      .withPosition(Position.at(4, 4))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    mower.placeOn(field);
    const instruction = Instruction.from(Instruction.TURN_RIGHT);
    instruction.applyOn(mower).getOrientation().should.be.deep.equal(Orientation.from(Orientation.EST));
  });
});

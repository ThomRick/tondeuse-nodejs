const chai = require('chai');
chai.should();

const Field = require('../../../src/domain/aggregate/field');
const Dimension = require('../../../src/domain/aggregate/dimension');

const Mower = require('../../../src/domain/aggregate/mower');
const MowerId = require('../../../src/domain/aggregate/mowerId');
const Position = require('../../../src/domain/aggregate/position');
const Orientation = require('../../../src/domain/aggregate/orientation');

const Instruction = require('../../../src/domain/aggregate/instruction');

const NewMowerCreated = require('../../../src/domain/aggregate/events/new-mower-created.event');
const PlacedOn = require('../../../src/domain/aggregate/events/placed-on.event');
const InstructionExecuted = require('../../../src/domain/aggregate/events/instruction-executed.event');

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
    const field = Field.Builder().withDimension(Dimension.of(5, 5)).build();
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    mower.placeOn(field);
    mower.getField().should.be.deep.equal(field);
  });
  it('should update the mower position after executing an move forward instruction', () => {
    const field = Field.Builder().withDimension(Dimension.of(5, 5)).build();
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    mower.placeOn(field);
    mower.execute(Instruction.from(Instruction.MOVE_FORWARD));
    mower.getPosition().should.be.deep.equal(Position.at(1, 0));
  });
  it('should fail to execute instruction because mower is not placed on a field', () => {
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    (() => mower.execute(Instruction.from(Instruction.MOVE_FORWARD)))
      .should.throw('Mower must be placed on a field before executing instruction.');
  });
  it('should add creation event when creating mower', () => {
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    mower.getUncommittedChanges()
      .should.be.an('array')
      .that.is.deep.equal([
        new NewMowerCreated(mower.getId(), mower.getPosition(), mower.getOrientation())
      ]);
  });
  it('should add a placed on field event when placed on a field', () => {
    const field = Field.Builder().withDimension(Dimension.of(5, 5)).build();
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    mower.placeOn(field);
    mower.getUncommittedChanges()
      .should.be.deep.equal([
        new NewMowerCreated(mower.getId(), mower.getPosition(), mower.getOrientation()),
        new PlacedOn(mower.getId(), field)
      ]);
  });
  it('should add instruction execution event when executing a valid instruction', () => {
    const field = Field.Builder().withDimension(Dimension.of(5, 5)).build();
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    const newMowerCreatedEvent = new NewMowerCreated(mower.getId(), mower.getPosition(), mower.getOrientation());
    mower.placeOn(field);
    mower.execute(Instruction.from(Instruction.MOVE_FORWARD));
    mower.getUncommittedChanges()
      .should.be.deep.equal([
        newMowerCreatedEvent,
        new PlacedOn(mower.getId(), field),
        new InstructionExecuted(mower.getId(), mower.getPosition(), mower.getOrientation())
      ]);
  });
  it('should rebuild mower from events', () => {
    const id = MowerId.create();
    const events = [
      new NewMowerCreated(id, Position.at(0, 0), Orientation.from(Orientation.NORTH)),
      new PlacedOn(id, Field.Builder().withDimension(Dimension.of(5, 5)).build()),
      new InstructionExecuted(id, Position.at(1, 0), Orientation.from(Orientation.NORTH))
    ];
    const mower = Mower.rebuild(events);
    mower.getId().should.be.deep.equal(id);
    mower.getPosition().should.be.deep.equal(Position.at(1, 0));
    mower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
  });
});

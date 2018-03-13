const chai = require('chai');
chai.should();

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const MowerId = require('../../../../src/domain/aggregates/mower/mower-id');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const NewMowerCreated = require('../../../../src/domain/aggregates/mower/events/new-mower-created.event');
const MowerMovedForward = require('../../../../src/domain/aggregates/mower/events/mower-moved.forward.event');
const MowerTurnedLeft = require('../../../../src/domain/aggregates/mower/events/mower-turned-left.event');
const MowerTurnedRight = require('../../../../src/domain/aggregates/mower/events/mower-turned-right.event');

describe('Mower', () => {
  it('should have a { 0, 0 } position and be North oriented when created as default', () => {
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField({ id: 'fieldId' })
      .build();
    mower.getPosition().should.be.deep.equal(Position.at(0, 0));
    mower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
    mower.getField().should.be.deep.equal({ id: 'fieldId' });
  });
  it('should fail if no position is specified', () => {
    (() => Mower.Builder()
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField({ id: 'fieldId' })
      .build()
    ).should.throw('Position must be specified');
  });
  it('should fail if no orientation is specified', () => {
    (() => Mower.Builder()
      .withPosition(Position.at(0, 0))
      .withField({ id: 'fieldId' })
      .build()
    ).should.throw('Orientation must be specified');
  });
  it('should fail if no field is specified', () => {
    (() => Mower.Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build()
    ).should.throw('Field must be specified');
  });
  it('should add creation event when creating mower', () => {
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField({ id: 'fieldId' })
      .build();
    mower.getUncommittedChanges()
      .should.be.an('array')
      .that.is.deep.equal([
        new NewMowerCreated(mower.getId(), mower.getPosition(), mower.getOrientation(), mower.getField())
      ]);
  });
  it('should add a moved forward event when move forward', () => {
    const field = { id: 'fieldId' };
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField(field)
      .build();
    mower.moveForward();
    mower.getUncommittedChanges()
      .should.be.deep.equal([
        new NewMowerCreated(mower.getId(), Position.at(0, 0), Orientation.from(Orientation.NORTH), field),
        new MowerMovedForward(mower.getId(), Position.at(1, 0))
      ]);
  });
  it('should add a turned left event when turn left', () => {
    const field = { id: 'fieldId' };
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField(field)
      .build();
    mower.turnLeft();
    mower.getUncommittedChanges()
      .should.be.deep.equal([
        new NewMowerCreated(mower.getId(), Position.at(0, 0), Orientation.from(Orientation.NORTH), field),
        new MowerTurnedLeft(mower.getId(), Orientation.from(Orientation.WEST))
      ]);
  });
  it('should add a turned right event when turn right', () => {
    const field = { id: 'fieldId' };
    const mower = Mower
      .Builder()
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField(field)
      .build();
    mower.turnRight();
    mower.getUncommittedChanges()
      .should.be.deep.equal([
        new NewMowerCreated(mower.getId(), Position.at(0, 0), Orientation.from(Orientation.NORTH), field),
        new MowerTurnedRight(mower.getId(), Orientation.from(Orientation.EST))
      ]);
  });
  it('should rebuild mower from events', () => {
    const field = { id: 'fieldId' };
    const id = MowerId.create();
    const events = [
      new NewMowerCreated(id, Position.at(0, 0), Orientation.from(Orientation.NORTH), field),
      new MowerMovedForward(id, Position.at(1, 0))
    ];
    const mower = Mower.rebuild(events);
    mower.getId().should.be.deep.equal(id);
    mower.getPosition().should.be.deep.equal(Position.at(1, 0));
    mower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
    mower.getField().should.be.deep.equal(field);
  });
});

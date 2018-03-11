const chai = require('chai');
chai.should();

const Field = require('../../../../src/domain/aggregates/field/field');
const Dimension = require('../../../../src/domain/aggregates/field/dimension');
const FieldDto = require('../../../../src/infra/server/dto/field.dto');

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const MowerId = require('../../../../src/domain/aggregates/mower/mowerId');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const Instruction = require('../../../../src/domain/aggregates/program/instruction');

const NewMowerCreated = require('../../../../src/domain/aggregates/mower/events/new-mower-created.event');
const MowerAffected = require('../../../../src/domain/aggregates/mower/events/mower-affected.event');

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
  it('should add an affected event when affect on a field', () => {
    const field = FieldDto.from(Field.Builder().withDimension(Dimension.of(5, 5)).build());
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    mower.affect(field);
    mower.getUncommittedChanges()
      .should.be.deep.equal([
        new NewMowerCreated(mower.getId(), mower.getPosition(), mower.getOrientation()),
        new MowerAffected(mower.getId(), field)
      ]);
  });
  it('should rebuild mower from events', () => {
    const id = MowerId.create();
    const field = FieldDto.from(Field.Builder().withDimension(Dimension.of(5, 5)).build());
    const events = [
      new NewMowerCreated(id, Position.at(0, 0), Orientation.from(Orientation.NORTH)),
      new MowerAffected(id, field),
    ];
    const mower = Mower.rebuild(events);
    mower.getId().should.be.deep.equal(id);
    mower.getPosition().should.be.deep.equal(Position.at(0, 0));
    mower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
    mower.getField().should.be.deep.equal(field);
  });
});

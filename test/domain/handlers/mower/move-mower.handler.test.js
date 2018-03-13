const chai = require('chai');
chai.should();

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const MowerId = require('../../../../src/domain/aggregates/mower/mower-id');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const InMemoryMowerRepository = require('../../../../src/infra/database/in-memory-mower.repository');
const MoveMowerHandler = require('../../../../src/domain/handlers/mower/move-mower.handler');

describe('Move Mower Handler', () => {
  let handler;
  let repository;
  beforeEach(() => {
    repository = new InMemoryMowerRepository();
    handler = new MoveMowerHandler(repository);
  });
  it('should move the mower forward', () => {
    const id = MowerId.create();
    const mower = Mower.Builder()
      .withId(id)
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField({ id: 'fieldId' })
      .build();
    repository.save(mower);
    handler.move(id, 'A');
    const movedMower = repository.get(id);
    movedMower.getPosition().should.be.deep.equal(Position.at(1, 0));
  });
  it('should turn left the mower', () => {
    const id = MowerId.create();
    const mower = Mower.Builder()
      .withId(id)
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField({ id: 'fieldId' })
      .build();
    repository.save(mower);
    handler.move(id, 'G');
    const movedMower = repository.get(id);
    movedMower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.WEST));
  });
  it('should turn right the mower', () => {
    const id = MowerId.create();
    const mower = Mower.Builder()
      .withId(id)
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .withField({ id: 'fieldId' })
      .build();
    repository.save(mower);
    handler.move(id, 'D');
    const movedMower = repository.get(id);
    movedMower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.EST));
  });
});

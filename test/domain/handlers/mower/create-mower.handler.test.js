const chai = require('chai');
chai.should();

const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const CreateMowerHandler = require('../../../../src/domain/handlers/mower/create-mower.handler');
const InMemoryMowerRepository = require('../../../../src/infra/database/in-memory-mower.repository');

describe.skip('Create Mower Handler', () => {
  let repository;
  let handler;
  before(() => {
    repository = new InMemoryMowerRepository();
    handler = new CreateMowerHandler(repository);
  });
  it('should add the new created mower to the database', () => {
    const createdMower = handler.create(Position.at(0, 0), Orientation.from(Orientation.NORTH));
    const savedMower = repository.get(createdMower.getId());
    savedMower.getPosition().should.be.deep.equal(createdMower.getPosition());
    savedMower.getOrientation().should.be.deep.equal(createdMower.getOrientation());
  });
});

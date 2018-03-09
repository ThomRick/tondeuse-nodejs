const chai = require('chai');
chai.should();

const Position = require('../../src/domain/aggregate/position');
const Orientation = require('../../src/domain/aggregate/orientation');

const { CreateMowerHandler } = require('../../src/domain/create-mower.handler');
const { InMemoryMowerRepository } = require('../../src/infra/database/in-memory-mower.repository');

describe('Create Mower Handler', () => {
  let mowerRepository;
  let createMowerHandler;
  before(() => {
    mowerRepository = new InMemoryMowerRepository();
    createMowerHandler = new CreateMowerHandler(mowerRepository);
  });
  it('should add the new created mower to the database', () => {
    const createdMower = createMowerHandler.createMower(Position.at(0, 0), Orientation.from(Orientation.NORTH));
    const savedMower = mowerRepository.get(createdMower.getId());
    savedMower.getPosition().should.be.deep.equal(createdMower.getPosition());
    savedMower.getOrientation().should.be.deep.equal(createdMower.getOrientation());
  });
});

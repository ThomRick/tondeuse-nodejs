const chai = require('chai');
chai.should();

const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const CreateMowerHandler = require('../../../../src/domain/handlers/mower/create-mower.handler');
const InMemoryMowerRepository = require('../../../../src/infra/database/in-memory-mower.repository');

describe('Create Mower Handler', () => {
  let repository;
  let handler;
  before(() => {
    repository = new InMemoryMowerRepository();
    handler = new CreateMowerHandler(repository);
  });
  it('should add the new created mower to the database', () => {
    const position = { x: 0, y: 0 };
    const orientation = 'N';
    const field = { id: 'fieldId '};
    const createdMower = handler.create(position, orientation, field);
    const savedMower = repository.get(createdMower.getId().getValue());
    savedMower.getPosition().should.be.deep.equal(Position.at(0, 0));
    savedMower.getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
    savedMower.getField().should.be.deep.equal(field);
  });
});

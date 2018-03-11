const chai = require('chai');
chai.should();

const Mower = require('../../src/domain/aggregates/mower/mower');
const Orientation = require('../../src/domain/aggregates/mower/orientation');
const Position = require('../../src/domain/aggregates/mower/position');

const Field = require('../../src/domain/aggregates/field/field');
const Dimension = require('../../src/domain/aggregates/field/dimension');

const InMemoryFieldRepository = require('../../src/infra/database/in-memory-field.repository');
const InMemoryMowerRepository = require('../../src/infra/database/in-memory-mower.repository');
const PlaceOnHandler = require('../../src/domain/place-on.handler');

describe('Place On Handler', () => {
  let mowerRepository;
  let fieldRepository;
  let placeOnHandler;
  before(() => {
    mowerRepository = InMemoryMowerRepository.getInstance();
    fieldRepository = InMemoryFieldRepository.getInstance();
    placeOnHandler = new PlaceOnHandler(mowerRepository, fieldRepository);
  });
  it('should link a mower and a field by placing the mower on it', () => {
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    mowerRepository.save(mower);
    const field = Field.Builder().withDimension(Dimension.of(4, 4)).build();
    fieldRepository.save(field);
    const placedOnMower = placeOnHandler.placeOn(mower.getId(), field.getId());
    placedOnMower.getPosition().should.be.deep.equal(mower.getPosition());
    placedOnMower.getOrientation().should.be.deep.equal(mower.getOrientation());
    placedOnMower.getField().getDimension().should.be.deep.equal(field.getDimension());
    mowerRepository.delete(placedOnMower.getId());
  });
});

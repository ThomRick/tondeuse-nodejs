const chai = require('chai');
chai.should();

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');
const Position = require('../../../../src/domain/aggregates/mower/position');

const InMemoryMowerRepository = require('../../../../src/infra/database/in-memory-mower.repository');
const ExtractMowerHandler = require('../../../../src/domain/handlers/mower/extract-mower.handler');

describe('Extract Mower Handler', () => {
  let extractMowerHandler;
  let mowerRepository;
  before(() => {
    mowerRepository = InMemoryMowerRepository.getInstance();
    extractMowerHandler = new ExtractMowerHandler(mowerRepository);
  });
  it('should retrieve all mowers when extractAll', () => {
    [
      Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build(),
      Mower.Builder().withPosition(Position.at(1, 1)).withOrientation(Orientation.from(Orientation.WEST)).build(),
      Mower.Builder().withPosition(Position.at(2, 2)).withOrientation(Orientation.from(Orientation.EST)).build(),
      Mower.Builder().withPosition(Position.at(3, 3)).withOrientation(Orientation.from(Orientation.SOUTH)).build()
    ].forEach((mower) => mowerRepository.save(mower));
    const extractedMowers = extractMowerHandler.extract();
    extractedMowers[0].getPosition().should.be.deep.equal(Position.at(0, 0));
    extractedMowers[0].getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
    extractedMowers[1].getPosition().should.be.deep.equal(Position.at(1, 1));
    extractedMowers[1].getOrientation().should.be.deep.equal(Orientation.from(Orientation.WEST));
    extractedMowers[2].getPosition().should.be.deep.equal(Position.at(2, 2));
    extractedMowers[2].getOrientation().should.be.deep.equal(Orientation.from(Orientation.EST));
    extractedMowers[3].getPosition().should.be.deep.equal(Position.at(3, 3));
    extractedMowers[3].getOrientation().should.be.deep.equal(Orientation.from(Orientation.SOUTH));
    extractedMowers.forEach((mower) => mowerRepository.delete(mower.getId()));
  });
});

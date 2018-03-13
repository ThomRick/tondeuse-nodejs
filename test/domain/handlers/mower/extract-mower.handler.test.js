const chai = require('chai');
chai.should();

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');
const Position = require('../../../../src/domain/aggregates/mower/position');

const InMemoryMowerRepository = require('../../../../src/infra/database/in-memory-mower.repository');
const ExtractMowerHandler = require('../../../../src/domain/handlers/mower/extract-mower.handler');

describe('Extract Mower Handler', () => {
  let handler;
  let repository;
  before(() => {
    repository = new InMemoryMowerRepository();
    handler = new ExtractMowerHandler(repository);
  });
  it('should retrieve all mowers when extractAll', () => {
    const field = { id: 'fieldId' };
    [
      Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).withField(field).build(),
      Mower.Builder().withPosition(Position.at(1, 1)).withOrientation(Orientation.from(Orientation.WEST)).withField(field).build(),
      Mower.Builder().withPosition(Position.at(2, 2)).withOrientation(Orientation.from(Orientation.EST)).withField(field).build(),
    ].forEach((mower) => repository.save(mower));
    const extractedMowers = handler.extract();
    extractedMowers[0].getPosition().should.be.deep.equal(Position.at(0, 0));
    extractedMowers[0].getOrientation().should.be.deep.equal(Orientation.from(Orientation.NORTH));
    extractedMowers[0].getField().should.be.deep.equal(field);
    extractedMowers[1].getPosition().should.be.deep.equal(Position.at(1, 1));
    extractedMowers[1].getOrientation().should.be.deep.equal(Orientation.from(Orientation.WEST));
    extractedMowers[1].getField().should.be.deep.equal(field);
    extractedMowers[2].getPosition().should.be.deep.equal(Position.at(2, 2));
    extractedMowers[2].getOrientation().should.be.deep.equal(Orientation.from(Orientation.EST));
    extractedMowers[2].getField().should.be.deep.equal(field);
  });
});

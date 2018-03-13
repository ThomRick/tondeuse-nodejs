const chai = require('chai');
chai.should();

const Field = require('../../../../src/domain/aggregates/field/field');
const Dimension = require('../../../../src/domain/aggregates/field/dimension');
const FieldDto = require('../../../../src/infra/server/dto/field.dto');

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const MowerId = require('../../../../src/domain/aggregates/mower/mowerId');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const InMemoryMowerRepository = require('../../../../src/infra/database/in-memory-mower.repository');

const AffectMowerHandler = require('../../../../src/domain/handlers/mower/affect-mower.handler');

describe.skip('Affect Mower Handler', () => {
  let handler;
  let repository;
  beforeEach(() => {
    repository = new InMemoryMowerRepository();
    handler = new AffectMowerHandler(repository);
  });
  it('should affect the mower id on a field', () => {
    const field = FieldDto.from(Field.Builder().withDimension(Dimension.of(4, 4)).build());
    const id = MowerId.create();
    const mower = Mower
      .Builder()
      .withId(id)
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    repository.save(mower);
    handler.affect(id, field);
    const affectedMower = repository.get(id);
    affectedMower.getField().should.be.deep.equal(field);
  });
});

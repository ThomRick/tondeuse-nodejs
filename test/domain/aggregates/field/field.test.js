const chai = require('chai');
chai.should();

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');
const MowerDto = require('../../../../src/infra/server/dto/mower.dto');

const Field = require('../../../../src/domain/aggregates/field/field');
const FieldId = require('../../../../src/domain/aggregates/field/fieldId');
const Dimension = require('../../../../src/domain/aggregates/field/dimension');

const NewFieldCreated = require('../../../../src/domain/aggregates/field/events/new-field-created.event');
const MowerDeployed = require('../../../../src/domain/aggregates/field/events/mower-deployed.event');

describe('Field', () => {
  it('should have the specified dimensions and no mowers when created with dimension', () => {
    const field = Field
      .Builder()
      .withDimension(Dimension.of(5, 5))
      .build();
    field.getDimension().should.be.deep.equal(Dimension.of(5, 5));
  });
  it('should fail if no dimension is specified', () => {
    (() => Field.Builder().build()).should.throw('Dimension must be specified');
  });
  it('should add created event when creating field', () => {
    const field = Field.Builder().withDimension(Dimension.of(5, 5)).build();
    field.getUncommittedChanges()
      .should.be.an('array')
      .that.is.deep.equal([
        new NewFieldCreated(field.getId(), field.getDimension())
      ]);
  });
  it('should add a deployed event when deploy a mower', () => {
    const mower = MowerDto.from(Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build());
    const field = Field.Builder().withDimension(Dimension.of(5, 5)).build();
    field.deploy(mower);
    field.getUncommittedChanges()
      .should.be.an('array')
      .that.is.deep.equal([
        new NewFieldCreated(field.getId(), field.getDimension()),
        new MowerDeployed(field.getId(), mower)
      ]);
  });
  it('should rebuild field from events', () => {
    const id = FieldId.create();
    const events = [
      new NewFieldCreated(id, Dimension.of(5, 5))
    ];
    const field = Field.rebuild(events);
    field.getId().should.be.deep.equal(id);
    field.getDimension().should.be.deep.equal(Dimension.of(5, 5));
  });
});

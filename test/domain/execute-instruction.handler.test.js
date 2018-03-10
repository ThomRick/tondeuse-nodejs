const chai = require('chai');
chai.should();

const Mower = require('../../src/domain/aggregates/mower/mower');
const Position = require('../../src/domain/aggregates/mower/position');
const Orientation = require('../../src/domain/aggregates/mower/orientation');

const Field = require('../../src/domain/aggregates/field/field');
const Dimension = require('../../src/domain/aggregates/field/dimension');

const InMemoryMowerRepository = require('../../src/infra/database/in-memory-mower.repository');
const ExecuteInstructionHandler = require('../../src/domain/execute-instruction.handler');


describe('Execute Instruction Handler', () => {
  let executeInstructionHandler;
  let mowerRepository;
  before(() => {
    mowerRepository = InMemoryMowerRepository.getInstance();
    executeInstructionHandler = new ExecuteInstructionHandler(mowerRepository);
  });
  it('executing instruction should update the mower position or orientation', () => {
    const field = Field.Builder().withDimension(Dimension.of(4, 4)).build();
    const existingMower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    existingMower.placeOn(field);
    mowerRepository.save(existingMower);
    executeInstructionHandler.executeInstruction(existingMower.getId(), 'A');
    const mowerUpdated = mowerRepository.get(existingMower.getId());
    mowerUpdated.getPosition().should.be.deep.equal(Position.at(1, 0));
    mowerUpdated.getOrientation().should.be.deep.equal(existingMower.getOrientation());
    mowerRepository.delete(mowerUpdated.getId());
  });
});

const chai = require('chai');
chai.should();

const Instruction = require('../../../../src/domain/aggregates/program/instruction');
const ProgramRepository = require('../../../../src/infra/database/in-memory-program.repository');

const CreateProgramHandler = require('../../../../src/domain/handlers/program/create-program.handler');

describe('Create Program Handler', () => {
  let handler;
  let repository;
  beforeEach(() => {
    repository = new ProgramRepository();
    handler = new CreateProgramHandler(repository);
  });
  it('should save the create program', () => {
    const instructions = [
      'A'
    ];
    const mower = {
      id: 'mowerId'
    };
    const createdProgram = handler.create(instructions, mower);
    const savedProgram = repository.get(createdProgram.getId().getValue());
    savedProgram.getInstructions().should.be.deep.equal([
      Instruction.from(Instruction.MOVE_FORWARD)
    ]);
    savedProgram.getMower().should.be.deep.equal(mower);
  });
});

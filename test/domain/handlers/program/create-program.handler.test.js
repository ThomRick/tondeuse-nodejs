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
    const createdProgram = handler.create([
      Instruction.from(Instruction.MOVE_FORWARD)
    ]);
    const savedProgram = repository.get(createdProgram.getId().getValue());
    savedProgram.getInstructions().should.be.deep.equal([ Instruction.from(Instruction.MOVE_FORWARD) ]);
  });
});

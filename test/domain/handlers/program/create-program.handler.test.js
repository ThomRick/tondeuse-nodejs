const chai = require('chai');
chai.should();

const Instruction = require('../../../../src/domain/aggregates/program/instruction');
const ProgramRepository = require('../../../../src/infra/database/in-memory-program.repository');

const CreateProgramHandler = require('../../../../src/domain/handlers/program/create-program.handler');

describe('Create Program Handler', () => {
  let createProgramHandler;
  let programRepository;
  before(() => {
    programRepository = ProgramRepository.getInstance();
    createProgramHandler = new CreateProgramHandler(programRepository);
  });
  it('should save the create program', () => {
    const createdProgram = createProgramHandler.create([
      Instruction.from(Instruction.MOVE_FORWARD)
    ]);
    const savedProgram = programRepository.get(createdProgram.getId());
    savedProgram.getInstructions().should.be.deep.equal([ Instruction.from(Instruction.MOVE_FORWARD) ]);
    programRepository.delete(savedProgram.getId());
  });
});

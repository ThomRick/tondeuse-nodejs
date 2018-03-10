const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');
const InMemoryProgramRepository = require('../../../../src/infra/database/in-memory-program.repository');

const ExtractProgramHandler = require('../../../../src/domain/handlers/program/extract-program.handler');

describe('Extract Program Handler', () => {
  let extractProgramHandler;
  let programRepository;
  before(() => {
    programRepository = InMemoryProgramRepository.getInstance();
    extractProgramHandler = new ExtractProgramHandler(programRepository);
  });
  it('should retrieve all programs', () => {
    [
      Program.with([ Instruction.from(Instruction.MOVE_FORWARD) ]),
      Program.with([ Instruction.from(Instruction.TURN_RIGHT) ]),
      Program.with([ Instruction.from(Instruction.TURN_LEFT) ])
    ].forEach((program) => programRepository.save(program));
    const extractedPrograms = extractProgramHandler.extract();
    extractedPrograms[0].getInstructions().should.be.deep.equal([ Instruction.from(Instruction.MOVE_FORWARD) ]);
    extractedPrograms[1].getInstructions().should.be.deep.equal([ Instruction.from(Instruction.TURN_RIGHT) ]);
    extractedPrograms[2].getInstructions().should.be.deep.equal([ Instruction.from(Instruction.TURN_LEFT) ]);
    extractedPrograms.forEach((program) => programRepository.delete(program));
  });
});
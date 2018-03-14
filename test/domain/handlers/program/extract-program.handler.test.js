const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');
const InMemoryProgramRepository = require('../../../../src/infra/database/in-memory-program.repository');

const ExtractProgramHandler = require('../../../../src/domain/handlers/program/extract-program.handler');

describe('Extract Program Handler', () => {
  let handler;
  let repository;
  before(() => {
    repository = new InMemoryProgramRepository();
    handler = new ExtractProgramHandler(repository);
  });
  it('should retrieve all programs', () => {
    [
      Program.Builder().withInstructions([ Instruction.from(Instruction.MOVE_FORWARD) ]).withMower({ id: 'mowerId0' }).build(),
      Program.Builder().withInstructions([ Instruction.from(Instruction.TURN_RIGHT) ]).withMower({ id: 'mowerId1' }).build(),
      Program.Builder().withInstructions([ Instruction.from(Instruction.TURN_LEFT) ]).withMower({ id: 'mowerId2' }).build()
    ].forEach((program) => repository.save(program));
    const extractedPrograms = handler.extract();
    extractedPrograms[0].getInstructions().should.be.deep.equal([ Instruction.from(Instruction.MOVE_FORWARD) ]);
    extractedPrograms[0].getMower().should.be.deep.equal({ id: 'mowerId0' });
    extractedPrograms[1].getInstructions().should.be.deep.equal([ Instruction.from(Instruction.TURN_RIGHT) ]);
    extractedPrograms[1].getMower().should.be.deep.equal({ id: 'mowerId1' });
    extractedPrograms[2].getInstructions().should.be.deep.equal([ Instruction.from(Instruction.TURN_LEFT) ]);
    extractedPrograms[2].getMower().should.be.deep.equal({ id: 'mowerId2' });
  });
});

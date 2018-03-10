const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');
const NewProgramCreated = require('../../../../src/domain/aggregates/program/events/new-program-created.event');

describe('Program', () => {
  it('should have the defined instructions when create with instructions', () => {
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const program = Program.with(instructions);
    program.getInstructions().should.be.deep.equal(instructions);
  });
  it('should fail if no instructions are provided when created', () => {
    (() => Program.with([])).should.throw('Instructions must be provided.');
  });
  it('should add creation event when created a program', () => {
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const program = Program.with(instructions);
    program.getUncommittedChanges().should.be.deep.equal([
      new NewProgramCreated(program.getId(), program.getInstructions())
    ]);
  });
});

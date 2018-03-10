const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const NewProgramCreated = require('../../../../src/domain/aggregates/program/events/new-program-created.event');
const ProgramInstalled = require('../../../../src/domain/aggregates/program/events/program-installed.event');

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
  it('should add an install event when installed on a mower', () => {
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const program = Program.with(instructions);
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    program.install(mower);
    program.getUncommittedChanges().should.be.deep.equal([
      new NewProgramCreated(program.getId(), program.getInstructions()),
      new ProgramInstalled(program.getId(), mower)
    ]);
  });
});

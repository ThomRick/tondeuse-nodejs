const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');
const ProgramId = require('../../../../src/domain/aggregates/program/program-id');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');

const NewProgramCreated = require('../../../../src/domain/aggregates/program/events/new-program-created.event');

describe('Program', () => {
  it('should have the defined instructions when create with instructions', () => {
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const mower = {
      id: 'mowerId'
    };
    const program = Program
      .Builder()
      .withInstructions(instructions)
      .withMower(mower)
      .build();
    program.getInstructions().should.be.deep.equal(instructions);
    program.getMower().should.be.deep.equal(mower);
  });
  it('should fail if no instructions are provided when created', () => {
    const mower = {
      id: 'mowerId'
    };
    (() => Program
      .Builder()
      .withInstructions([])
      .withMower(mower)
      .build()
    ).should.throw('Instructions must be provided.');
  });
  it('should fail if no mower is provided when created', () => {
    (() => Program
      .Builder()
      .withInstructions([
        Instruction.from(Instruction.MOVE_FORWARD)
      ])
      .build()
    ).should.throw('Mower must be provided.');
  });
  it('should add creation event when created a program', () => {
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const mower = {
      id: 'mowerId'
    };
    const program = Program
      .Builder()
      .withInstructions(instructions)
      .withMower(mower)
      .build();
    program.getUncommittedChanges().should.be.deep.equal([
      new NewProgramCreated(program.getId(), program.getInstructions(), program.getMower())
    ]);
  });
  it('should rebuild program from events', () => {
    const id = ProgramId.create();
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const mower = {
      id: 'mowerId'
    };
    const events = [
      new NewProgramCreated(id, instructions, mower)
    ];
    const program = Program.rebuild(events);
    program.getId().should.be.deep.equal(id);
    program.getInstructions().should.be.deep.equal(instructions);
    program.getMower().should.be.deep.equal(mower);
  });
});

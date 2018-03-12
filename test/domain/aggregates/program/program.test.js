const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');
const ProgramId = require('../../../../src/domain/aggregates/program/program-id');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const Field = require('../../../../src/domain/aggregates/field/field');
const Dimension = require('../../../../src/domain/aggregates/field/dimension');

const NewProgramCreated = require('../../../../src/domain/aggregates/program/events/new-program-created.event');
const ProgramInstalled = require('../../../../src/domain/aggregates/program/events/program-installed.event');
const ProgramExecuted = require('../../../../src/domain/aggregates/program/events/program-executed.event');

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
  it('should rebuild program from events', () => {
    const id = ProgramId.create();
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const events = [
      new NewProgramCreated(id, instructions),
      new ProgramInstalled(id, {
        id: 'id',
        position: {
          x: 0,
          y: 0
        },
        orientation: 'N'
      })
    ];
    const program = Program.rebuild(events);
    program.getId().should.be.deep.equal(id);
    program.getInstructions().should.be.deep.equal(instructions);
  });
  it('should add an installed event when installed on a mower', () => {
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const program = Program.with(instructions);
    const mower = {
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N'
    };
    program.install(mower);
    program.getUncommittedChanges().should.be.deep.equal([
      new NewProgramCreated(program.getId(), program.getInstructions()),
      new ProgramInstalled(program.getId(), mower)
    ]);
  });
  it.skip('should add an executed event when program finished', () => {
    const field = Field.Builder().withDimension(Dimension.of(4, 4)).build();
    const mower = Mower.Builder().withPosition(Position.at(0, 0)).withOrientation(Orientation.from(Orientation.NORTH)).build();
    mower.placeOn(field);
    const instructions = [
      Instruction.from(Instruction.MOVE_FORWARD)
    ];
    const program = Program.with(instructions);
    program.install(mower);
    program.execute();
    program.getUncommittedChanges().should.be.deep.equal([
      new NewProgramCreated(program.getId(), program.getInstructions()),
      new ProgramInstalled(program.getId(), mower),
      new ProgramExecuted(program.getId(), mower)
    ]);
  });
});

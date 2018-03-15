const Program = require('../../aggregates/program/program');
const Instruction = require('../../aggregates/program/instruction');

class CreateProgramHandler {
  constructor(programRepository) {
    this.programRepository = programRepository;
  }

  create(instructions, mower) {
    const program = Program
      .Builder()
      .withInstructions(instructions.map((instruction) => Instruction.from(instruction)))
      .withMower(mower)
      .build();
    this.programRepository.save(program);
    return program;
  }
}

module.exports = CreateProgramHandler;

const Program = require('../../aggregates/program/program');

class CreateProgramHandler {
  constructor(programRepository) {
    this.programRepository = programRepository;
  }

  create(instructions, mower) {
    const program = Program
      .Builder()
      .withInstructions(instructions)
      .withMower(mower)
      .build();
    this.programRepository.save(program);
    return program;
  }
}

module.exports = CreateProgramHandler;

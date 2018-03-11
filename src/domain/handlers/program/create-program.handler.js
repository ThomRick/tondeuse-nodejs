const Program = require('../../aggregates/program/program');

class CreateProgramHandler {
  constructor(programRepository) {
    this.programRepository = programRepository;
  }

  create(instructions) {
    const program = Program.with(instructions);
    this.programRepository.save(program);
    return program;
  }
}

module.exports = CreateProgramHandler;

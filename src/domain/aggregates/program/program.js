const ProgramId = require('./program-id');

class Program {
  constructor(id, instructions) {
    this.id = id;
    this.instructions = instructions;
  }

  getInstructions() {
    return this.instructions;
  }

  static with(instructions) {
    return new Program(ProgramId.create(), instructions);
  }
}

module.exports = Program;

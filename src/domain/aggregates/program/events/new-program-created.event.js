class NewProgramCreated {
  constructor(id, instructions) {
    this.id = id;
    this.instructions = instructions;
  }

  getId() {
    return this.id;
  }

  getInstructions() {
    return this.instructions;
  }

  apply(program) {
    return program.applyNew(this);
  }
}

module.exports = NewProgramCreated;

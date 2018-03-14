class NewProgramCreated {
  constructor(id, instructions, mower) {
    this.id = id;
    this.instructions = instructions;
    this.mower = mower;
  }

  getId() {
    return this.id;
  }

  getInstructions() {
    return this.instructions;
  }

  getMower() {
    return this.mower;
  }

  apply(program) {
    return program.applyNew(this);
  }
}

module.exports = NewProgramCreated;

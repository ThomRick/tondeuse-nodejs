class ProgramExecuted {
  constructor(id, mower) {
    this.id = id;
    this.mower = mower;
  }

  getId() {
    return this.id;
  }

  getMower() {
    return this.mower;
  }

  apply(program) {
    return program.applyExecute(this);
  }
}

module.exports = ProgramExecuted;

class ProgramInstalled {
  constructor(id, program) {
    this.id = id;
    this.program = program;
  }

  getId() {
    return this.id;
  }

  getProgram() {
    return this.program;
  }

  apply(mower) {
    return mower.applyInstall(this);
  }
}

module.exports = ProgramInstalled;

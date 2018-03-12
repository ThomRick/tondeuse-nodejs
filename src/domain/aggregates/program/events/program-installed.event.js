class ProgramInstalled {
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
    return program.applyInstall(this);
  }
}

module.exports = ProgramInstalled;

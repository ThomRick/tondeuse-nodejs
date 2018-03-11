class ProgramId {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  static create() {
    return new ProgramId(Date.now());
  }
}

module.exports = ProgramId;

class ProgramId {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  static create() {
    return new ProgramId(++ProgramId.COUNTER);
  }
}

ProgramId.COUNTER = 0;

module.exports = ProgramId;

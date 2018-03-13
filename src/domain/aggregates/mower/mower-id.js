class MowerId {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  static create() {
    return new MowerId(++MowerId.COUNTER);
  }
}

MowerId.COUNTER = 0;

module.exports = MowerId;

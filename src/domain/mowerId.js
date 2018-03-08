class MowerId {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  static create() {
    return new MowerId(Date.now());
  }
}

module.exports = MowerId;

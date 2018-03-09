class FieldId {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  static create() {
    return new FieldId(Date.now());
  }
}

module.exports = FieldId;

class FieldId {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  static create() {
    return new FieldId(++FieldId.COUNTER);
  }
}

FieldId.COUNTER = 0;

module.exports = FieldId;

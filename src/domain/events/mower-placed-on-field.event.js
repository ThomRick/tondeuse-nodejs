class MowerPlacedOnField {
  constructor(id, field) {
    this.id = id;
    this.field = field;
  }

  getId() {
    return this.id;
  }

  getField() {
    return this.field;
  }
}

module.exports = MowerPlacedOnField;

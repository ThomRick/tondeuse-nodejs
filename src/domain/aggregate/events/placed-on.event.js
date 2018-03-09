class PlacedOn {
  constructor(id, field) {
    this.id = id;
    this.field = field;
  }

  apply(mower) {
    return mower.applyPlaceOn(this);
  }

  getId() {
    return this.id;
  }

  getField() {
    return this.field;
  }
}

module.exports = PlacedOn;

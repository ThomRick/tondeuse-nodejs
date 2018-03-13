class NewMowerCreated {
  constructor(id, position, orientation, field) {
    this.id = id;
    this.position = position;
    this.orientation = orientation;
    this.field = field;
  }

  getId() {
    return this.id;
  }

  getPosition() {
    return this.position;
  }

  getOrientation() {
    return this.orientation;
  }

  getField() {
    return this.field;
  }

  apply(mower) {
    return mower.applyNew(this);
  }
}

module.exports = NewMowerCreated;

class NewMowerCreated {
  constructor(id, position, orientation) {
    this.id = id;
    this.position = position;
    this.orientation = orientation;
  }

  apply(mower) {
    return mower.applyNew(this);
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
}

module.exports = NewMowerCreated;

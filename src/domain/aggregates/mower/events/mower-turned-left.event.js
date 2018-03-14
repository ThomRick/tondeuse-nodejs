class MowerTurnedLeft {
  constructor(id, orientation) {
    this.id = id;
    this.orientation = orientation;
  }

  getId() {
    return this.id;
  }

  getOrientation() {
    return this.orientation;
  }

  apply(mower) {
    return mower.applyTurnLeft(this);
  }
}

module.exports = MowerTurnedLeft;

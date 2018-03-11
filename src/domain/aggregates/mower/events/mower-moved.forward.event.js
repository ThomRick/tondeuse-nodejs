class MowerMovedForward {
  constructor(id, position) {
    this.id = id;
    this.position = position;
  }

  getId() {
    return this.id;
  }

  getPosition() {
    return this.position;
  }

  apply(mower) {
    return mower.applyMoveForward(this);
  }
}

module.exports = MowerMovedForward;

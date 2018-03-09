class InstructionExecuted {
  constructor(id, position, orientation) {
    this.id = id;
    this.position = position;
    this.orientation = orientation;
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

module.exports = InstructionExecuted;

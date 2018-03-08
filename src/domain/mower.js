const MowerId = require('./mowerId');

class MowerBuilder {
  constructor() {}

  withId(id) {
    this.id = id;
    return this;
  }

  withPosition(position) {
    this.positon = position;
    return this;
  }

  withOrientation(orientation) {
    this.orientation = orientation;
    return this;
  }

  build() {
    if (this.id === undefined) {
      this.id = MowerId.create();
    }
    if (this.positon === undefined) {
      throw new Error('Position must be specified');
    }
    if (this.orientation === undefined) {
      throw new Error('Orientation must be specified');
    }
    return new Mower(this.id, this.positon, this.orientation);
  }
}

class Mower {
  constructor(id, position, orientation) {
    this.id = id;
    this.orientation = orientation;
    this.position = position;
  }

  placeOn(field) {
    this.field = field;
  }

  execute(instruction) {
    if (this.field === undefined) {
      throw new Error('Mower must be placed on a field before executing instruction.');
    }
    const newState = instruction.applyOn(this);
    this.position = newState.getPosition();
    this.orientation = newState.getOrientation();
  }

  getField() {
    return this.field;
  }

  getId() {
    return this.id;
  }

  getOrientation() {
    return this.orientation;
  }

  getPosition() {
    return this.position;
  }

  static Builder() {
    return new MowerBuilder();
  }
}

module.exports = Mower;

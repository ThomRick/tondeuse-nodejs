const MowerId = require('./mowerId');

class MowerBuilder {
  constructor() {}

  withPosition(position) {
    this.positon = position;
    return this;
  }

  withOrientation(orientation) {
    this.orientation = orientation;
    return this;
  }

  build() {
    if (this.positon === undefined) {
      throw new Error('Position must be specified');
    }
    if (this.orientation === undefined) {
      throw new Error('Orientation must be specified');
    }
    return new Mower(MowerId.create(), this.positon, this.orientation);
  }
}

class Mower {
  constructor(id, position, orientation) {
    this.id = id;
    this.orientation = orientation;
    this.position = position;
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

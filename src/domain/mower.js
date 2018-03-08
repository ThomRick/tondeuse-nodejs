const MowerId = require('./mowerId');
const MowerOrientation = require('./orientation');
const MowerPosition = require('./position');

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

  static default() {
    return new Mower(MowerId.create(), MowerPosition.default(), MowerOrientation.default());
  }
}

module.exports = Mower;

const Orientation = require('./orientation');

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  move(orientation) {
    switch (orientation.getValue()) {
      case Orientation.NORTH:
        return new Position(this.x + 1, this.y);
      case Orientation.SOUTH:
        return new Position(this.x - 1, this.y);
      case Orientation.EST:
        return new Position(this.x, this.y + 1);
      case Orientation.WEST:
        return new Position(this.x, this.y - 1);
    }
  }

  static at(x, y) {
    return new Position(x, y);
  }
}

module.exports = Position;

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

  static at(x, y) {
    return new Position(x, y);
  }
}

module.exports = Position;

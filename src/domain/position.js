class MowerPosition {
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
    return new MowerPosition(x, y);
  }
}

module.exports = MowerPosition;

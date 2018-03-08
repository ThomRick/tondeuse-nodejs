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

  static default() {
    return new MowerPosition(0, 0);
  }
}

module.exports = MowerPosition;

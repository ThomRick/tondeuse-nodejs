class Dimension {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  static of(width, length) {
    return new Dimension(width, length);
  }
}

module.exports = Dimension;

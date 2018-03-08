class FieldDimension {
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
    return new FieldDimension(width, length);
  }
}

module.exports = FieldDimension;

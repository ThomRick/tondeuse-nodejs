class Orientation {
  constructor(value) {
    this.value = value;
  }

  right() {
    switch (this.value) {
      case 'N':
        return new Orientation('E');
      case 'E':
        return new Orientation('S');
      case 'S':
        return new Orientation('W');
      case 'W':
        return new Orientation('N');
    }
  }

  left() {
    switch (this.value) {
      case 'N':
        return new Orientation('W');
      case 'E':
        return new Orientation('N');
      case 'S':
        return new Orientation('E');
      case 'W':
        return new Orientation('S');
    }
  }

  getValue() {
    return this.value;
  }
}

Orientation.EST = new Orientation('E');
Orientation.NORTH = new Orientation('N');
Orientation.SOUTH = new Orientation('S');
Orientation.WEST = new Orientation('W');

module.exports = Orientation;

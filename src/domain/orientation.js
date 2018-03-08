class MowerOrientation {
  constructor(value) {
    this.value = value;
  }

  right() {
    switch (this.value) {
      case 'N':
        return new MowerOrientation('E');
      case 'E':
        return new MowerOrientation('S');
      case 'S':
        return new MowerOrientation('W');
      case 'W':
        return new MowerOrientation('N');
    }
  }

  left() {
    switch (this.value) {
      case 'N':
        return new MowerOrientation('W');
      case 'E':
        return new MowerOrientation('N');
      case 'S':
        return new MowerOrientation('E');
      case 'W':
        return new MowerOrientation('S');
    }
  }
}

MowerOrientation.EST = new MowerOrientation('E');
MowerOrientation.NORTH = new MowerOrientation('N');
MowerOrientation.SOUTH = new MowerOrientation('S');
MowerOrientation.WEST = new MowerOrientation('W');

module.exports = MowerOrientation;

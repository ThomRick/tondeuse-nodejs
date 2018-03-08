class MowerOrientation {
  constructor() {}

  static default() {
    return MowerOrientation.NORTH;
  }
}

MowerOrientation.EST = (() => 'E')();
MowerOrientation.NORTH = (() => 'N')();
MowerOrientation.SOUTH = (() => 'S')();
MowerOrientation.WEST = (() => 'W')();

module.exports = MowerOrientation;

class Orientation {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  static from(value) {
    switch (value) {
      case Orientation.NORTH:
        return new North();
      case Orientation.EST:
        return new East();
      case Orientation.SOUTH:
        return new South();
      case Orientation.WEST:
        return new West();
    }
  }
}

class East extends Orientation {
  constructor() {
    super(Orientation.EST);
  }

  left() {
    return new North();
  }

  right() {
    return new South();
  }
}

class North extends Orientation {
  constructor() {
    super(Orientation.NORTH);
  }

  left() {
    return new West();
  }

  right() {
    return new East();
  }
}

class South extends Orientation {
  constructor() {
    super(Orientation.SOUTH);
  }

  left() {
    return new East();
  }

  right() {
    return new West();
  }
}

class West extends Orientation {
  constructor() {
    super(Orientation.WEST);
  }

  left() {
    return new South();
  }

  right() {
    return new North();
  }
}

Orientation.EST = 'E';
Orientation.NORTH = 'N';
Orientation.SOUTH = 'S';
Orientation.WEST = 'W';

module.exports = Orientation;

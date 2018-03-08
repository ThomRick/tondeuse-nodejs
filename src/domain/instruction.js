const Mower = require('./mower');
const Position = require('./position');

class Instruction {
  static from(value) {
    switch (value) {
      case 'A':
        return new MoveForwardInstruction();
      case 'D':
        return new TurnRightInstruction();
      case 'G':
        return new TurnLeftInstruction();
    }
  }
}

class MoveForwardInstruction extends Instruction {
  applyOn(mower) {
    return Mower
      .Builder()
      .withId(mower.getId())
      .withPosition(this._computeNewPositionOf(mower))
      .withOrientation(mower.getOrientation())
      .build();
  }

  _computeNewPositionOf(mower) {
    const currentPosition = mower.getPosition();
    switch (mower.getOrientation().getValue()) {
      case 'N':
        return Position.at(currentPosition.getX() + 1, currentPosition.getY());
      case 'E':
        return Position.at(currentPosition.getX(), currentPosition.getY() + 1);
      case 'S':
        return Position.at(currentPosition.getX() - 1, currentPosition.getY());
      case 'W':
        return Position.at(currentPosition.getX(), currentPosition.getY() - 1);
    }
  }
}

class TurnLeftInstruction extends Instruction {
  applyOn(mower) {
    return Mower
      .Builder()
      .withId(mower.getId())
      .withPosition(mower.getPosition())
      .withOrientation(this._computeNewOrientationOf(mower))
      .build();
  }

  _computeNewOrientationOf(mower) {
    return mower.getOrientation().left();
  }
}

class TurnRightInstruction extends Instruction {
  applyOn(mower) {
    return Mower
      .Builder()
      .withId(mower.getId())
      .withPosition(mower.getPosition())
      .withOrientation(this._computeNewOrientationOf(mower))
      .build();
  }

  _computeNewOrientationOf(mower) {
    return mower.getOrientation().right();
  }
}

module.exports = Instruction;

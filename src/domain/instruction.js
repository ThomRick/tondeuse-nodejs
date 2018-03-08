const Mower = require('./mower');
const Position = require('./position');
const Orientation = require('./orientation');

class Instruction {
  static from(value) {
    switch (value) {
      case Instruction.MOVE_FORWARD:
        return new MoveForwardInstruction();
      case Instruction.TURN_RIGHT:
        return new TurnRightInstruction();
      case Instruction.TURN_LEFT:
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
      case Orientation.NORTH:
        return Position.at(currentPosition.getX() + 1, currentPosition.getY());
      case Orientation.EST:
        return Position.at(currentPosition.getX(), currentPosition.getY() + 1);
      case Orientation.SOUTH:
        return Position.at(currentPosition.getX() - 1, currentPosition.getY());
      case Orientation.WEST:
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

Instruction.MOVE_FORWARD = 'A';
Instruction.TURN_RIGHT = 'D';
Instruction.TURN_LEFT = 'G';

module.exports = Instruction;

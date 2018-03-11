const Mower = require('../mower/mower');
const Position = require('../mower/position');
const Orientation = require('../mower/orientation');

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
        return Position.at(this._computeNewXPositionToTheNorth(mower), currentPosition.getY());
      case Orientation.EST:
        return Position.at(currentPosition.getX(), this._computeNewYPositionToTheEast(mower));
      case Orientation.SOUTH:
        return Position.at(this._computeNewXPositionToTheSouth(mower), currentPosition.getY());
      case Orientation.WEST:
        return Position.at(currentPosition.getX(), this._computeNewYPositionToTheWest(mower));
    }
  }

  _computeNewXPositionToTheNorth(mower) {
    const position = mower.getPosition();
    const fieldDimension = mower.getField().getDimension();
    const newPosition = position.getX() + 1;
    if (newPosition > fieldDimension.getWidth()) {
      throw new Error('Mower is out of the field.');
    }
    return newPosition;
  }

  _computeNewYPositionToTheEast(mower) {
    const position = mower.getPosition();
    const fieldDimension = mower.getField().getDimension();
    const newPosition = position.getY() + 1;
    if (newPosition > fieldDimension.getLength()) {
      throw new Error('Mower is out of the field.');
    }
    return newPosition;
  }

  _computeNewXPositionToTheSouth(mower) {
    const position = mower.getPosition();
    const newPosition = position.getX() - 1;
    if (newPosition < 0) {
      throw new Error('Mower is out of the field.');
    }
    return newPosition;
  }

  _computeNewYPositionToTheWest(mower) {
    const position = mower.getPosition();
    const newPosition = position.getY() - 1;
    if (newPosition < 0) {
      throw new Error('Mower is out of the field.');
    }
    return newPosition;
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

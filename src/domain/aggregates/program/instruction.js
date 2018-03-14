class Instruction {
  constructor(value) {
    this.value = value;
  }

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

  canExecute() {
    return false;
  }

  getValue() {
    return this.value;
  }
}

class MoveForwardInstruction extends Instruction {
  constructor() {
    super('A');
  }

  canExecute(mower) {
    switch (mower.orientation) {
      case 'W':
        return this._isNoCollisionToWest(mower.position.y);
      case 'E':
        return this._isNoCollisionToEast(mower.position.y, mower.field.dimension.length);
      case 'N':
        return this._isNoCollisionToNorth(mower.position.x, mower.field.dimension.width);
      case 'S':
        return this._isNoCollisionToSouth(mower.position.x);
      default:
        return false;
    }
  }

  _isNoCollisionToWest(y) {
    return 0 < y;
  }

  _isNoCollisionToEast(y, length) {
    return y < length;
  }

  _isNoCollisionToNorth(x, width) {
    return x < width;
  }

  _isNoCollisionToSouth(x) {
    return 0 < x;
  }
}

class TurnLeftInstruction extends Instruction {
  constructor() {
    super('G');
  }

  canExecute() {
    return true;
  }
}

class TurnRightInstruction extends Instruction {
  constructor() {
    super('D');
  }

  canExecute() {
    return true;
  }
}

Instruction.MOVE_FORWARD = 'A';
Instruction.TURN_RIGHT = 'D';
Instruction.TURN_LEFT = 'G';

module.exports = Instruction;

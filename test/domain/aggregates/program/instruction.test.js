const chai = require('chai');
chai.should();

const Instruction = require('../../../../src/domain/aggregates/program/instruction');

describe('Instruction', () => {
  it('can always execute turn left instruction', () => {
    const instruction = Instruction.from(Instruction.TURN_LEFT);
    return instruction.canExecute({
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N',
      field: {
        dimension: {
          width: 4,
          length: 4
        }
      }
    }).should.be.true;
  });
  it('can always execute turn right instruction', () => {
    const instruction = Instruction.from(Instruction.TURN_RIGHT);
    return instruction.canExecute({
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N',
      field: {
        dimension: {
          width: 4,
          length: 4
        }
      }
    }).should.be.true;
  });
  it('can execute move forward if no collisions', () => {
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    return instruction.canExecute({
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N',
      field: {
        dimension: {
          width: 4,
          length: 4
        }
      }
    }).should.be.true;
  });
  it('can not execute move forward if collision to the WEST', () => {
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    return instruction.canExecute({
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'W',
      field: {
        dimension: {
          width: 4,
          length: 4
        }
      }
    }).should.be.false;
  });
  it('can not execute move forward if collision to the EST', () => {
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    return instruction.canExecute({
      id: 'id',
      position: {
        x: 0,
        y: 4
      },
      orientation: 'E',
      field: {
        dimension: {
          width: 4,
          length: 4
        }
      }
    }).should.be.false;
  });
  it('can not execute move forward if collision to the NORTH', () => {
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    return instruction.canExecute({
      id: 'id',
      position: {
        x: 4,
        y: 0
      },
      orientation: 'N',
      field: {
        dimension: {
          width: 4,
          length: 4
        }
      }
    }).should.be.false;
  });
  it('can not execute move forward if collision to the SOUTH', () => {
    const instruction = Instruction.from(Instruction.MOVE_FORWARD);
    return instruction.canExecute({
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'S',
      field: {
        dimension: {
          width: 4,
          length: 4
        }
      }
    }).should.be.false;
  });
});

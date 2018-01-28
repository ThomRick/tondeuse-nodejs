import { expect } from 'chai';
import { SimpleMower } from '../../../src/mower/impl/simple.mower';
import { Mower } from '../../../src/mower/mower';
import { Direction } from '../../../src/orientation/direction';
import { CardinalOrientation } from '../../../src/orientation/impl/cardinal.orientation';
import { Orientation } from '../../../src/orientation/orientation';
import { CartesianPosition } from '../../../src/position/impl/cartesian.position';
import { Position } from '../../../src/position/position';

describe('SimpleMower', () => {
  let position: Position;
  let orientation: Orientation;
  let mower: Mower;
  beforeEach(() => {
    position = new CartesianPosition(0, 0, 0);
    orientation = new CardinalOrientation(Direction.NORTH);
    mower = new SimpleMower(position, orientation);
  });
  describe('constructor', () => {
    it('should create a new Mower and give read access to it’s properties', () => {
      expect((<SimpleMower> mower).position).to.be.deep.equal(position);
      expect((<SimpleMower> mower).orientation).to.be.deep.equal(orientation);
    });
  });
  describe('#move()', () => {
    it('should return the new mower position', () => {
      expect(mower.move()).to.be.deep.equal(position);
    });
  });
});

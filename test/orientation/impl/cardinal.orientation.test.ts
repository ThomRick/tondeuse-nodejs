import { expect } from 'chai';
import { Direction } from '../../../src/orientation/direction';
import { CardinalOrientation } from '../../../src/orientation/impl/cardinal.orientation';
import { Orientation } from '../../../src/orientation/orientation';

describe('CardinalOrientation', () => {
  it('can be created', () => {
    const direction: Direction = Direction.NORTH;
    const orientation: Orientation = new CardinalOrientation(direction);
    expect(orientation).to.be.deep.equal(new CardinalOrientation(direction));
  });
});

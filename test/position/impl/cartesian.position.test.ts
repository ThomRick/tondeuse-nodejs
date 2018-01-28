import { expect } from 'chai';
import { CartesianPosition } from '../../../src/position/impl/cartesian.position';
import { Position } from '../../../src/position/position';

describe('CartesianPosition', () => {
  it('can be created', () => {
    const x = 0;
    const y = 0;
    const z = 0;
    const position: Position = new CartesianPosition(x, y, z);
    expect((<CartesianPosition> position).x).to.be.equal(x);
    expect((<CartesianPosition> position).y).to.be.equal(y);
    expect((<CartesianPosition> position).z).to.be.equal(z);
  });
});

import { Orientation } from '../../orientation/orientation';
import { Position } from '../../position/position';
import { Mower } from '../mower';

export class SimpleMower implements Mower {
  constructor(private _position: Position, private _orientation: Orientation) {
  }

  public move(): Position {
    return this.position;
  }

  get position(): Position {
    return this._position;
  }

  get orientation(): Orientation {
    return this._orientation;
  }
}

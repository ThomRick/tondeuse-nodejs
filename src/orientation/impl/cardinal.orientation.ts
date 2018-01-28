import { Direction } from '../direction';
import { Orientation } from '../orientation';

export class CardinalOrientation implements Orientation {
  constructor(private _direction: Direction) {}
}

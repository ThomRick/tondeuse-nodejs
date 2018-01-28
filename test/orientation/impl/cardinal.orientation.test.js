"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const direction_1 = require("../../../src/orientation/direction");
const cardinal_orientation_1 = require("../../../src/orientation/impl/cardinal.orientation");
describe('CardinalOrientation', () => {
    it('can be created', () => {
        const direction = direction_1.Direction.NORTH;
        const orientation = new cardinal_orientation_1.CardinalOrientation(direction);
        chai_1.expect(orientation).to.be.deep.equal(new cardinal_orientation_1.CardinalOrientation(direction));
    });
});
//# sourceMappingURL=cardinal.orientation.test.js.map
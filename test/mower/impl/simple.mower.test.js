"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const simple_mower_1 = require("../../../src/mower/impl/simple.mower");
const direction_1 = require("../../../src/orientation/direction");
const cardinal_orientation_1 = require("../../../src/orientation/impl/cardinal.orientation");
const cartesian_position_1 = require("../../../src/position/impl/cartesian.position");
describe('SimpleMower', () => {
    let position;
    let orientation;
    let mower;
    beforeEach(() => {
        position = new cartesian_position_1.CartesianPosition(0, 0, 0);
        orientation = new cardinal_orientation_1.CardinalOrientation(direction_1.Direction.NORTH);
        mower = new simple_mower_1.SimpleMower(position, orientation);
    });
    describe('constructor', () => {
        it('should create a new Mower and give read access to it’s properties', () => {
            chai_1.expect(mower.position).to.be.deep.equal(position);
            chai_1.expect(mower.orientation).to.be.deep.equal(orientation);
        });
    });
    describe('#move()', () => {
        it('should return the new mower position', () => {
            chai_1.expect(mower.move()).to.be.deep.equal(position);
        });
    });
});
//# sourceMappingURL=simple.mower.test.js.map
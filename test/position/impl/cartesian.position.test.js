"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const cartesian_position_1 = require("../../../src/position/impl/cartesian.position");
describe('CartesianPosition', () => {
    it('can be created', () => {
        const x = 0;
        const y = 0;
        const z = 0;
        const position = new cartesian_position_1.CartesianPosition(x, y, z);
        chai_1.expect(position.x).to.be.equal(x);
        chai_1.expect(position.y).to.be.equal(y);
        chai_1.expect(position.z).to.be.equal(z);
    });
});
//# sourceMappingURL=cartesian.position.test.js.map
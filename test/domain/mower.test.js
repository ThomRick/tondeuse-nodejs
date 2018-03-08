const chai = require('chai');
chai.should();

const Mower = require('../../src/domain/mower');
const MowerOrientation = require('../../src/domain/orientation');
const MowerPosition = require('../../src/domain/position');

describe('Mower', () => {
  it('should have a { 0, 0 } position and be North oriented when created as default', () => {
    const mower = Mower.default();
    mower.getPosition().should.be.deep.equal(MowerPosition.default());
    mower.getOrientation().should.be.deep.equal(MowerOrientation.default());
  });
});

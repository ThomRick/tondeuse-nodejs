const chai = require('chai');
chai.should();

const Mower = require('../../../src/domains/mower/mower');
const MowerOrientation = require('../../../src/domains/mower/orientation');
const MowerPosition = require('../../../src/domains/mower/position');

describe('Mower', () => {
  it('should have a { 0, 0 } position and be North oriented when created as default', () => {
    const mower = Mower.default();
    mower.getPosition().should.be.deep.equal(MowerPosition.default());
    mower.getOrientation().should.be.deep.equal(MowerOrientation.default());
  });
});

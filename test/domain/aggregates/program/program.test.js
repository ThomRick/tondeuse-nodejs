const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');

describe('Program', () => {
  it('should have the defined instructions when create with instruction', () => {
    const instructions = [];
    const program = Program.with(instructions);
    program.getInstructions().should.be.deep.equal(instructions);
  });
});

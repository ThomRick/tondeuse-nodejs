const chai = require('chai');
chai.should();

const Program = require('../../../../src/domain/aggregates/program/program');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');

const InMemoryProgramRepository = require('../../../../src/infra/database/in-memory-program.repository');

const InstallProgramHandler = require('../../../../src/domain/handlers/program/install-program.handler');

describe('Install Program Handler', () => {
  let handler;
  let repository;
  beforeEach(() => {
    repository = new InMemoryProgramRepository();
    handler = new InstallProgramHandler(repository);
  });
  it('should add the mower after install', () => {
    const program = Program.with([
      Instruction.from(Instruction.MOVE_FORWARD)
    ]);
    repository.save(program);
    handler.install(program.getId(), {
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N'
    });
    repository.get(program.getId()).getMower().should.be.deep.equal({
      id: 'id',
      position: {
        x: 0,
        y: 0
      },
      orientation: 'N'
    });
  });
});

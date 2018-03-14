const chai = require('chai');
chai.should();
const sinon = require('sinon');
const request = require('request');

const Mower = require('../../../../src/domain/aggregates/mower/mower');
const Position = require('../../../../src/domain/aggregates/mower/position');
const Orientation = require('../../../../src/domain/aggregates/mower/orientation');

const InMemoryMowerRepository = require('../../../../src/infra/database/in-memory-mower.repository');

const InstallProgramHandler = require('../../../../src/domain/handlers/mower/install-program.handler');

describe('Install Program handler', () => {
  let sandbox;
  let handler;
  let repository;
  beforeEach(() => {
    repository = new InMemoryMowerRepository();
    handler = new InstallProgramHandler(repository);
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should call the program service to create the program', async () => {
    const mower = Mower
      .Builder()
      .withField({ id: 'fieldId' })
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    repository.save(mower);
    const postStub = sandbox.stub(request, 'post')
      .callsFake((options, callback) => callback(null, {}, JSON.stringify({
        id: 'programId',
        instructions: [ 'D', 'A', 'G', 'A', 'G' ],
        mower: {
          id: mower.getId().getValue()
        }
      })));
    const program = {
      instructions: [ 'D', 'A', 'G', 'A', 'G' ]
    };
    await handler.install(mower.getId().getValue(), program);
    sandbox.assert.calledWith(postStub, {
      url: 'http://localhost:3000/api/programs',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(program)
    });
  });
  it('should return the mower with its installed program', async () => {
    const mower = Mower
      .Builder()
      .withField({ id: 'fieldId' })
      .withPosition(Position.at(0, 0))
      .withOrientation(Orientation.from(Orientation.NORTH))
      .build();
    repository.save(mower);
    sandbox.stub(request, 'post').callsFake((options, callback) => callback(null, {}, JSON.stringify({
      id: 'programId',
      instructions: [ 'D', 'A', 'G', 'A', 'G' ],
      mower: {
        id: mower.getId().getValue()
      }
    })));
    const program = {
      instructions: [ 'D', 'A', 'G', 'A', 'G' ]
    };
    const installedMower = await handler.install(mower.getId().getValue(), program);
    installedMower.getId().should.be.deep.equal(mower.getId());
    installedMower.getPosition().should.be.deep.equal(mower.getPosition());
    installedMower.getOrientation().should.be.deep.equal(mower.getOrientation());
    installedMower.getField().should.be.deep.equal(mower.getField());
    installedMower.getProgram().should.be.deep.equal({
      id: 'programId',
      instructions: [ 'D', 'A', 'G', 'A', 'G' ],
      mower: {
        id: mower.getId().getValue()
      }
    });
  });
});

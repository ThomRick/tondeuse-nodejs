const chai = require('chai');
chai.should();
const sinon = require('sinon');
const request = require('request');

const Program = require('../../../../src/domain/aggregates/program/program');
const Instruction = require('../../../../src/domain/aggregates/program/instruction');

const InMemoryProgramRepository = require('../../../../src/infra/database/in-memory-program.repository');

const RunProgramHandler = require('../../../../src/domain/handlers/program/run-program.handler');

describe('Run Program Handler', () => {
  let getStub;
  let putStub;
  let sandbox;
  let handler;
  let repository;
  beforeEach(() => {
    repository = new InMemoryProgramRepository();
    handler = new RunProgramHandler(repository);
    sandbox = sinon.sandbox.create();
    getStub = sandbox.stub(request, 'get')
      .callsFake((options, callback) => {
        if (options.url === `http://localhost:3000/api/mowers/${ 'mowerId' }`) {
          callback(null, {}, JSON.stringify({
            id: 'mowerId',
            position: {
              x: 0,
              y: 0
            },
            orientation: 'N',
            field: {
              id: 'fieldId'
            },
            program: {
              id: 'programId'
            }
          }));
        } else {
          callback(null, {}, JSON.stringify({
            id: 'fieldId',
            dimension: {
              width: 4,
              length: 4
            },
            mowers: [
              {
                id: 'mowerId'
              }
            ]
          }));
        }
      });
    putStub = sandbox.stub(request, 'put')
      .callsFake((options, callback) => {
        callback(null, {}, JSON.stringify({
          id: 'mowerId',
          position: {
            x: 1,
            y: 0
          },
          orientation: 'N',
          field: {
            id: 'fieldId'
          },
          program: {
            id: 'programId'
          }
        }));
      });
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should get the mower description where the program is installed on', async () => {
    let program = Program
      .Builder()
      .withInstructions([
        Instruction.from(Instruction.MOVE_FORWARD)
      ])
      .withMower({ id: 'mowerId' })
      .build();
    repository.save(program);
    await handler.run(program.getId().getValue());
    sandbox.assert.calledWith(getStub, {
      url: `http://localhost:3000/api/mowers/${ 'mowerId' }`
    });
  });
  it('should get the mower field description', async () => {
    let program = Program
      .Builder()
      .withInstructions([
        Instruction.from(Instruction.MOVE_FORWARD)
      ])
      .withMower({ id: 'mowerId' })
      .build();
    repository.save(program);
    await handler.run(program.getId().getValue());
    sandbox.assert.calledWith(getStub, {
      url: `http://localhost:3000/api/fields/${ 'fieldId' }`
    });
  });
  it('should send move commands to the mower', async () => {
    let program = Program
      .Builder()
      .withInstructions([
        Instruction.from(Instruction.MOVE_FORWARD),
        Instruction.from(Instruction.TURN_RIGHT),
      ])
      .withMower({ id: 'mowerId' })
      .build();
    repository.save(program);
    await handler.run(program.getId().getValue());
    sandbox.assert.calledTwice(putStub);
    sandbox.assert.calledWith(putStub, {
      url: `http://localhost:3000/api/mowers/${ 'mowerId' }?action=move`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        instruction: 'A'
      })
    });
    sandbox.assert.calledWith(putStub, {
      url: `http://localhost:3000/api/mowers/${ 'mowerId' }?action=move`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        instruction: 'D'
      })
    });
  });
  it('should return the last mower state', async () => {
    let program = Program
      .Builder()
      .withInstructions([
        Instruction.from(Instruction.MOVE_FORWARD)
      ])
      .withMower({ id: 'mowerId' })
      .build();
    repository.save(program);
    const report = await handler.run(program.getId().getValue());
    report.should.have.deep.property('mower', {
      id: 'mowerId',
      position: {
        x: 1,
        y: 0
      },
      orientation: 'N',
      field: {
        id: 'fieldId'
      },
      program: {
        id: 'programId'
      }
    });
  });
});

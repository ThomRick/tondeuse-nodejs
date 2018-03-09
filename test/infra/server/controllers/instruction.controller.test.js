const chai = require('chai');
chai.should();
const Koa = require('koa');
const request = require('supertest');

const InstructionController = require('../../../../src/infra/server/controllers/instruction.controller');

describe('Instruction Controller', () => {
  it('should expose POST /api/instructions endpoint when loaded', async () => {
    const controller = InstructionController.load();
    const server = new Koa();
    server.use(controller.routes());
    const response = await request(server.callback())
      .post('/api/instructions')
      .send({});
    response.status.should.be.equal(201);
  });
});

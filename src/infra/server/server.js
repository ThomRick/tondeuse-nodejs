const Koa = require('koa');

const FieldController = require('./controllers/field.controller');
const MowerController = require('./controllers/mower.controller');
const InstructionController = require('./controllers/instruction.controller');

function bootstrap() {
  const server = new Koa();
  server.use(FieldController.load().routes());
  server.use(MowerController.load().routes());
  server.use(InstructionController.load().routes());
  return server;
}

module.exports = bootstrap();

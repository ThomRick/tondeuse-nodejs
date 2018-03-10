const Koa = require('koa');
const BodyParser = require('koa-bodyparser');

const FieldController = require('./controllers/field.controller');
const MowerController = require('./controllers/mower.controller');
const ProgramController = require('./controllers/programs.controller');

function bootstrap() {
  const server = new Koa();
  server.use(BodyParser());
  server.use(FieldController.load().routes());
  server.use(MowerController.load().routes());
  server.use(ProgramController.load().routes());
  return server;
}

module.exports = bootstrap();

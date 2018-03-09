const Koa = require('koa');
const FieldController = require('./controllers/field.controller');
const MowerController = require('./controllers/mower.controller');

function bootstrap() {
  const server = new Koa();
  server.use(FieldController.load().routes());
  server.use(MowerController.load().routes());
  return server;
}

module.exports = bootstrap();

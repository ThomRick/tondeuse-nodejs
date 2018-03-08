const Koa = require('koa');
const Router = require('koa-router');

const server = new Koa();

const router = new Router();
router.get('/*', async (context) => {
  context.body = 'Hello World!';
});
server.use(router.routes());

module.exports = server;

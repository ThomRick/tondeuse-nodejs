const Router = require('koa-router');

class MowerController {
  constructor(router) {
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/mowers', this.create);
    this.router.get('/api/mowers', this.getAll);
  }

  async create(context) {
    context.status = 201;
  }

  async getAll(context) {
    context.status = 200;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new MowerController(new Router());
  }
}

module.exports = MowerController;

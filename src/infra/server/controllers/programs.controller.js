const Router = require('koa-router');

class ProgramController {
  constructor(router) {
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/programs', this.create);
  }

  async create(context) {
    context.status = 201;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new ProgramController(new Router());
  }
}

module.exports = ProgramController;

const Router = require('koa-router');

class MowerController {
  constructor(router) {
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/mowers', this._post);
  }

  async _post(context) {
    context.status = 201;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new MowerController(new Router());
  }
}

module.exports = MowerController;

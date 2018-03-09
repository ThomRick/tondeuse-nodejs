const Router = require('koa-router');

class FieldController {
  constructor(router) {
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/fields', this._create);
    this.router.get('/api/fields', this._getAll);
  }

  async _create(context) {
    context.status = 201;
  }

  async _getAll(context) {
    context.status = 200;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new FieldController(new Router());
  }
}

module.exports = FieldController;

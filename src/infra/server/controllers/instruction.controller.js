const Router = require('koa-router');

class InstructionController {
  constructor(router) {
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/instructions', this._post);
  }

  async _post(context) {
    context.status = 201;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new InstructionController(new Router());
  }
}

module.exports = InstructionController;

const Router = require('koa-router');
const CreateFieldHandler = require('../../../domain/handlers/field/create-field.handler');
const ExtractFieldHandler = require('../../../domain/handlers/field/extract-field.handler');

class FieldController {
  constructor(router) {
    this.createFieldHandler = new CreateFieldHandler();
    this.extractFieldHandler = new ExtractFieldHandler();
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/fields', this.create);
    this.router.get('/api/fields', this.getAll);
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
    return new FieldController(new Router());
  }
}

module.exports = FieldController;

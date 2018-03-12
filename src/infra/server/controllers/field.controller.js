const Router = require('koa-router');
const CreateFieldHandler = require('../../../domain/handlers/field/create-field.handler');
const ExtractFieldHandler = require('../../../domain/handlers/field/extract-field.handler');
const InMemoryFieldRepository = require('../../database/in-memory-field.repository');
const FieldDto = require('../dto/field.dto');

class FieldController {
  constructor(router) {
    const repository = new InMemoryFieldRepository();
    this.createFieldHandler = new CreateFieldHandler(repository);
    this.extractFieldHandler = new ExtractFieldHandler(repository);
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/fields', this.create.bind(this));
    this.router.get('/api/fields', this.getAll.bind(this));
  }

  async create(context) {
    console.log(`${ FieldController.name }::create() - request body - ${ JSON.stringify(context.request.body, null, 2)}`);
    context.response.body = FieldDto.from(this.createFieldHandler.create(context.request.body.dimension));
    context.response.status = 201;
  }

  async getAll(context) {
    console.log(`${ FieldController.name }::getAll()`);
    context.response.body = this.extractFieldHandler.extract().map((field) => FieldDto.from(field));
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

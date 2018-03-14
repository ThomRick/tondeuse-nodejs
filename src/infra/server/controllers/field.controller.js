const Router = require('koa-router');

const FieldDto = require('../dto/field.dto');

const InMemoryFieldRepository = require('../../database/in-memory-field.repository');

const CreateFieldHandler = require('../../../domain/handlers/field/create-field.handler');
const ExtractFieldHandler = require('../../../domain/handlers/field/extract-field.handler');
const DeployMowerHandler = require('../../../domain/handlers/field/deploy-mower.handler');

class FieldController {
  constructor(router) {
    const repository = new InMemoryFieldRepository();
    this.createFieldHandler = new CreateFieldHandler(repository);
    this.extractFieldHandler = new ExtractFieldHandler(repository);
    this.deployMowerHandler = new DeployMowerHandler(repository);
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/fields', this.create.bind(this));
    this.router.get('/api/fields', this.getAll.bind(this));
    this.router.get('/api/fields/:id', this.getById.bind(this));
    this.router.put('/api/fields/:id', this.update.bind(this));
  }

  async create(context) {
    context.response.body = FieldDto.from(this.createFieldHandler.create(context.request.body.dimension));
    context.response.status = 201;
  }

  async getAll(context) {
    context.response.body = this.extractFieldHandler.extract().map((field) => FieldDto.from(field));
    context.response.status = 200;
  }

  async getById(context) {
    const id = context.params.id;
    context.response.body = FieldDto.from(this.extractFieldHandler.extract(id));
    context.response.status = 200;
  }

  async update(context) {
    const id = context.params.id;
    const mower = context.request.body;
    const field = await this.deployMowerHandler.deploy(id, mower);
    context.response.body = FieldDto.from(field);
    context.response.status = 200;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new FieldController(new Router());
  }
}

module.exports = FieldController;

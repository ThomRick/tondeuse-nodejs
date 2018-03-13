const Router = require('koa-router');
const InMemoryMowerRepository = require('../../database/in-memory-mower.repository');

const CreateMowerHandler = require('../../../domain/handlers/mower/create-mower.handler');
const ExtractMowerHandler = require('../../../domain/handlers/mower/extract-mower.handler');
const MoveMowerHandler = require('../../../domain/handlers/mower/move-mower.handler');

const MowerDto = require('../dto/mower.dto');

class MowerController {
  constructor(router) {
    const repository = new InMemoryMowerRepository();
    this.createMowerHandler = new CreateMowerHandler(repository);
    this.extractMowerHandler = new ExtractMowerHandler(repository);
    this.moveMowerHandler = new MoveMowerHandler(repository);
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/mowers', this.create.bind(this));
    this.router.get('/api/mowers', this.getAll.bind(this));
    this.router.put('/api/mowers/:id', this.update.bind(this));
  }

  async create(context) {
    const position = context.request.body.position;
    const orientation = context.request.body.orientation;
    const field = context.request.body.field;
    context.response.body = MowerDto.from(this.createMowerHandler.create(position, orientation, field));
    context.response.status = 201;
  }

  async getAll(context) {
    context.response.body = this.extractMowerHandler.extract().map((mower) => MowerDto.from(mower));
    context.response.status = 200;
  }

  async update(context) {
    this.moveMowerHandler.move(context.params.id, context.request.body.instruction);
    context.response.status = 200;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new MowerController(new Router());
  }
}

module.exports = MowerController;

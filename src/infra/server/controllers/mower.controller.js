const Router = require('koa-router');
const InMemoryMowerRepository = require('../../database/in-memory-mower.repository');
const CreateMowerHandler = require('../../../domain/handlers/mower/create-mower.handler');
const ExtractMowerHandler = require('../../../domain/handlers/mower/extract-mower.handler');
const MowerDto = require('../dto/mower.dto');

class MowerController {
  constructor(router) {
    const mowerRepository = InMemoryMowerRepository.getInstance();
    this.createMowerHandler = new CreateMowerHandler(mowerRepository);
    this.extractMowerHandler = new ExtractMowerHandler(mowerRepository);
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/mowers', this.create.bind(this));
    this.router.get('/api/mowers', this.getAll.bind(this));
  }

  async create(context) {
    console.log(`${ MowerController.name }::create() - request body - ${ JSON.stringify(context.request.body, null, 2)}`);
    const position = context.request.body.position;
    const orientation = context.request.body.orientation;
    context.response.body = MowerDto.from(this.createMowerHandler.createMower(position, orientation));
    context.response.status = 201;
  }

  async getAll(context) {
    console.log(`${ MowerController.name }::getAll()`);
    context.response.body = this.extractMowerHandler.extractAll().map((mower) => MowerDto.from(mower));
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

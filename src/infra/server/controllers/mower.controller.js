const Router = require('koa-router');
const InMemoryMowerRepository = require('../../database/in-memory-mower.repository');

const CreateMowerHandler = require('../../../domain/handlers/mower/create-mower.handler');
const ExtractMowerHandler = require('../../../domain/handlers/mower/extract-mower.handler');
const InstallProgramHandler = require('../../../domain/handlers/mower/install-program.handler');
const MoveMowerHandler = require('../../../domain/handlers/mower/move-mower.handler');

const MowerDto = require('../dto/mower.dto');

class MowerController {
  constructor(router) {
    const repository = new InMemoryMowerRepository();
    this.createMowerHandler = new CreateMowerHandler(repository);
    this.extractMowerHandler = new ExtractMowerHandler(repository);
    this.installProgramHandler = new InstallProgramHandler(repository);
    this.moveMowerHandler = new MoveMowerHandler(repository);
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/mowers', this.create.bind(this));
    this.router.get('/api/mowers', this.getAll.bind(this));
    this.router.get('/api/mowers/:id', this.getById.bind(this));
    this.router.put('/api/mowers/:id', this.update.bind(this));
  }

  async create(context) {
    const position = context.request.body.position;
    const orientation = context.request.body.orientation;
    const field = context.request.body.field;
    context.response.body = MowerDto.from(this.createMowerHandler.create(position, orientation, field));
    context.response.status = 201;
  }

  async getById(context) {
    const id = context.params.id;
    context.response.body = MowerDto.from(this.extractMowerHandler.extract(id));
    context.response.status = 200;
  }

  async getAll(context) {
    context.response.body = this.extractMowerHandler.extract().map((mower) => MowerDto.from(mower));
    context.response.status = 200;
  }

  async update(context) {
    const action = context.query.action;
    switch (action) {
      case 'move':
        context.response.body = this.moveMowerHandler.move(context.params.id, context.request.body.instruction);
        break;
      case 'install':
        const id = context.params.id;
        const program = context.request.body;
        context.response.body = MowerDto.from(await this.installProgramHandler.install(id, program));
        break;
    }
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

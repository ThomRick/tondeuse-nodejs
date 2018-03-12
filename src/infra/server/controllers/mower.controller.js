const Router = require('koa-router');
const InMemoryMowerRepository = require('../../database/in-memory-mower.repository');

const CreateMowerHandler = require('../../../domain/handlers/mower/create-mower.handler');
const ExtractMowerHandler = require('../../../domain/handlers/mower/extract-mower.handler');
const AffectMowerHandler = require('../../../domain/handlers/mower/affect-mower.handler');
const MoveMowerHandler = require('../../../domain/handlers/mower/move-mower.handler');

const MowerDto = require('../dto/mower.dto');

class MowerController {
  constructor(router) {
    const repository = new InMemoryMowerRepository();
    this.createMowerHandler = new CreateMowerHandler(repository);
    this.extractMowerHandler = new ExtractMowerHandler(repository);
    this.affectMowerHandler = new AffectMowerHandler(repository);
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
    console.log(`${ MowerController.name }::create() - request body : ${ JSON.stringify(context.request.body, null, 2)}`);
    const position = context.request.body.position;
    const orientation = context.request.body.orientation;
    context.response.body = MowerDto.from(this.createMowerHandler.create(position, orientation));
    context.response.status = 201;
  }

  async getAll(context) {
    console.log(`${ MowerController.name }::getAll()`);
    context.response.body = this.extractMowerHandler.extract().map((mower) => MowerDto.from(mower));
    context.response.status = 200;
  }

  async update(context) {
    console.log(`${ MowerController.name }::update() - action : ${ context.query.action } - request body : ${ JSON.stringify(context.request.body, null, 2) }`);
    const action = context.query.action;
    switch (action) {
      case 'affect':
        this.affectMowerHandler.affect(context.params.id, context.request.body.field);
        break;
      case 'move':
        this.moveMowerHandler.move(context.params.id, context.request.body.instruction);
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

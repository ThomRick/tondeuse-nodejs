const Router = require('koa-router');
const InMemoryProgramRepository = require('../../database/in-memory-program.repository');
const CreateProgramHandler = require('../../../domain/handlers/program/create-program.handler');
const ExtractProgramHandler = require('../../../domain/handlers/program/extract-program.handler');
const ProgramDto = require('../dto/program.dto');

class ProgramController {
  constructor(router) {
    const repository = new InMemoryProgramRepository();
    this.createProgramHandler = new CreateProgramHandler(repository);
    this.extractProgramhandler = new ExtractProgramHandler(repository);
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/programs', this.create.bind(this));
    this.router.get('/api/programs', this.getAll.bind(this));
    this.router.put('/api/programs/:id', this.update.bind(this));
  }

  async create(context) {
    const instructions = context.request.body.instructions;
    const mower = context.request.body.mower;
    context.response.body = ProgramDto.from(this.createProgramHandler.create(instructions, mower));
    context.response.status = 201;
  }

  async getAll(context) {
    context.response.body = this.extractProgramhandler.extract().map((program) => ProgramDto.from(program));
    context.response.status = 200;
  }

  async update(context) {
    context.response.status = 200;
  }

  routes() {
    return this.router.routes();
  }

  static load() {
    return new ProgramController(new Router());
  }
}

module.exports = ProgramController;

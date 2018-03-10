const Router = require('koa-router');
const InMemoryProgramRepository = require('../../database/in-memory-program.repository');
const CreateProgramHandler = require('../../../domain/handlers/program/create-program.handler');
const ExtractProgramHandler = require('../../../domain/handlers/program/extract-program.handler');
const ProgramDto = require('../dto/program.dto');

class ProgramController {
  constructor(router) {
    const programRepository = InMemoryProgramRepository.getInstance();
    this.createProgramHandler = new CreateProgramHandler(programRepository);
    this.extractProgramhandler = new ExtractProgramHandler(programRepository);
    this.router = router;
    this._registerRoutes();
  }

  _registerRoutes() {
    this.router.post('/api/programs', this.create.bind(this));
    this.router.get('/api/programs', this.getAll.bind(this));
  }

  async create(context) {
    console.log(`${ ProgramController.name }::create() - request body - ${ JSON.stringify(context.request.body, null, 2)}`);
    const instructions = context.request.body.instructions;
    context.response.body = ProgramDto.from(this.createProgramHandler.create(instructions));
    context.response.status = 201;
  }

  async getAll(context) {
    console.log(`${ ProgramController.name }::getAll()`);
    context.response.body = this.extractProgramhandler.extract().map((program) => ProgramDto.from(program));
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

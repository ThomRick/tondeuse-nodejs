const Program = require('../../domain/aggregates/program/program');

class InMemoryProgramRepository {
  constructor(database = new Map()) {
    this.database = database;
  }

  save(program) {
    const events = this.database.get(program.getId()) || [];
    this.database.set(program.getId(), events.concat(program.getUncommittedChanges()));
  }

  getAll() {
    const programs = [];
    // this.database.forEach((events) => programs.push(Program.rebuild(events)));
    return programs;
  }

  get(programId) {

  }
}

module.exports = InMemoryProgramRepository;

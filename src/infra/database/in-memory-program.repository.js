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
    this.database.forEach((events) => programs.push(Program.rebuild(events)));
    return programs;
  }

  get(programId) {
    return Program.rebuild(this.database.get(programId));
  }
}

module.exports = InMemoryProgramRepository;

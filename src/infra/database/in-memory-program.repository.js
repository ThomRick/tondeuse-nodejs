const Program = require('../../domain/aggregates/program/program');

class InMemoryProgramRepository {
  constructor(database = new Map()) {
    this.database = database;
  }

  save(program) {
    const events = this.database.get(program.getId().getValue().toString()) || [];
    while (program.getUncommittedChanges().length !== 0) {
      events.push(program.getUncommittedChanges().shift());
    }
    this.database.set(program.getId().getValue().toString(), events);
  }

  getAll() {
    const programs = [];
    this.database.forEach((events) => programs.push(Program.rebuild(events)));
    return programs;
  }

  get(programId) {
    return Program.rebuild(this.database.get(programId.toString()));
  }
}

module.exports = InMemoryProgramRepository;

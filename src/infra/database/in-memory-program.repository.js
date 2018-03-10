const Program = require('../../domain/aggregates/program/program');

class InMemoryProgramRepository {
  constructor(database) {
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

  delete(fieldId) {
    this.database.delete(fieldId);
  }

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new InMemoryProgramRepository(new Map());
    }
    return this.instance;
  }
}

module.exports = InMemoryProgramRepository;

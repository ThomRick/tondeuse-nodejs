const Mower = require('../../domain/aggregates/mower/mower');

class InMemoryMowerRepository {
  constructor(database = new Map()) {
    this.database = database;
  }

  save(mower) {
    const events = this.database.get(mower.getId()) || [];
    this.database.set(mower.getId(), events.concat(mower.getUncommittedChanges()));
  }

  getAll() {
    const mowers = [];
    this.database.forEach((events) => mowers.push(Mower.rebuild(events)));
    return mowers;
  }

  get(mowerId) {
    return Mower.rebuild(this.database.get(mowerId));
  }
}

module.exports = InMemoryMowerRepository;

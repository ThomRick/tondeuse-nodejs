const Mower = require('../../domain/aggregates/mower/mower');

class InMemoryMowerRepository {
  constructor(database= new Map()) {
    this.database = database;
  }

  save(mower) {
    const events = this.database.get(mower.getId().getValue().toString()) || [];
    while (mower.getUncommittedChanges().length !== 0) {
      events.push(mower.getUncommittedChanges().shift());
    }
    this.database.set(mower.getId().getValue().toString(), events);
  }

  getAll() {
    const mowers = [];
    this.database.forEach((events) => mowers.push(Mower.rebuild(events)));
    return mowers;
  }

  get(mowerId) {
    return Mower.rebuild(this.database.get(mowerId.toString()));
  }
}

module.exports = InMemoryMowerRepository;

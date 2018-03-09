const Mower = require('../../../domain/aggregate/mower');

class InMemoryMowerRepository {
  constructor(database = new Map()) {
    this.database = database;
  }

  save(mower) {
    const events = this.database.get(mower.getId()) || [];
    this.database.set(mower.getId(), events.concat(mower.getUncommittedChanges()));
  }

  get(mowerId) {
    return Mower.rebuild(this.database.get(mowerId));
  }
}

module.exports = { InMemoryMowerRepository };

const Field = require('../../domain/aggregate/field');

class InMemoryFieldRepository {
  constructor(database = new Map()) {
    this.database = database;
  }

  save(field) {
    const events = this.database.get(field.getId()) || [];
    this.database.set(field.getId(), events.concat(field.getUncommittedChanges()));
  }

  get(fieldId) {
    return Field.rebuild(this.database.get(fieldId));
  }
}

module.exports = InMemoryFieldRepository;

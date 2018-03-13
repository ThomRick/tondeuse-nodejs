const Field = require('../../domain/aggregates/field/field');

class InMemoryFieldRepository {
  constructor(database = new Map()) {
    this.database = database;
  }

  save(field) {
    const events = this.database.get(field.getId().getValue().toString()) || [];
    this.database.set(field.getId().getValue().toString(), events.concat(field.getUncommittedChanges()));
  }

  getAll() {
    const fields = [];
    this.database.forEach((events) => fields.push(Field.rebuild(events)));
    return fields;
  }

  get(fieldId) {
    return Field.rebuild(this.database.get(fieldId.toString()));
  }
}

module.exports = InMemoryFieldRepository;

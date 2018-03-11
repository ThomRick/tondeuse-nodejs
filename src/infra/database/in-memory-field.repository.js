const Field = require('../../domain/aggregates/field/field');

class InMemoryFieldRepository {
  constructor(database) {
    this.database = database;
  }

  save(field) {
    const events = this.database.get(field.getId()) || [];
    this.database.set(field.getId(), events.concat(field.getUncommittedChanges()));
  }

  getAll() {
    const fields = [];
    this.database.forEach((events) => fields.push(Field.rebuild(events)));
    return fields;
  }

  get(fieldId) {
    return Field.rebuild(this.database.get(fieldId));
  }

  delete(fieldId) {
    this.database.delete(fieldId);
  }

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new InMemoryFieldRepository(new Map());
    }
    return this.instance;
  }
}

module.exports = InMemoryFieldRepository;

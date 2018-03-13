const Field = require('../../domain/aggregates/field/field');

class InMemoryFieldRepository {
  constructor(database = new Map()) {
    this.database = database;
  }

  save(field) {
    console.log(`${ InMemoryFieldRepository.name }::save() - field : ${ JSON.stringify(field, null, 2) }`);
    const events = this.database.get(field.getId().getValue().toString()) || [];
    this.database.set(field.getId().getValue().toString(), events.concat(field.getUncommittedChanges()));
  }

  getAll() {
    console.log(`${ InMemoryFieldRepository.name }::getAll()`);
    const fields = [];
    this.database.forEach((events) => fields.push(Field.rebuild(events)));
    return fields;
  }

  get(fieldId) {
    console.log(`${ InMemoryFieldRepository.name }::get() - fieldId : ${ fieldId }`);
    console.log(this.database);
    const events = this.database.get(fieldId.toString());
    console.log(events);
    return Field.rebuild(events);
  }
}

module.exports = InMemoryFieldRepository;

const FieldId = require('./fieldId');
const NewFieldCreated = require('./events/new-field-created.event');

class FieldBuilder {
  constructor() {}

  withDimension(dimension) {
    this.dimension = dimension;
    return this;
  }

  withId(id) {
    this.id = id;
    return this;
  }

  build() {
    if (this.dimension === undefined) {
      throw new Error('Dimension must be specified');
    }
    if (this.id === undefined) {
      this.id = FieldId.create();
    }
    return new Field(this.id, this.dimension);
  }
}

class Field {
  constructor(id, dimension) {
    this.uncommittedChanges = [];
    if (id !== undefined && dimension !== undefined) {
      const event = new NewFieldCreated(id, dimension);
      this.apply(event);
      this._saveUncommittedChange(event);
    }
  }

  apply(event) {
    this.id = event.getId();
    this.dimension = event.getDimension();
    return this;
  }

  getId() {
    return this.id;
  }

  getDimension() {
    return this.dimension;
  }

  getUncommittedChanges() {
    return this.uncommittedChanges;
  }

  static Builder() {
    return new FieldBuilder();
  }

  _saveUncommittedChange(event) {
    this.uncommittedChanges.push(event);
  }

  static rebuild(events) {
    return events.reduce((field, event) => event.apply(field), new Field());
  }
}

module.exports = Field;

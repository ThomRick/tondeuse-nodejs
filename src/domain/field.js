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
    const event = new NewFieldCreated(id, dimension);
    this._apply(event);
    this._saveUncommittedChange(event);
  }

  _apply(event) {
    this.id = event.getId();
    this.dimension = event.getDimension();
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
}

module.exports = Field;

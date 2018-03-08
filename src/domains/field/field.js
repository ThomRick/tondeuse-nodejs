const FieldId = require('./fieldId');

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
    this.id = id;
    this.dimension = dimension;
  }

  getId() {
    return this.id;
  }

  getDimension() {
    return this.dimension;
  }

  static Builder() {
    return new FieldBuilder();
  }
}

module.exports = Field;

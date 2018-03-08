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

  withMowers(mowers) {
    this.mowers = mowers;
    return this;
  }

  build() {
    if (this.dimension === undefined) {
      throw new Error('Dimension must be specified');
    }
    if (this.id === undefined) {
      this.id = FieldId.create();
    }
    if (this.mowers === undefined) {
      this.mowers = [];
    }
    return new Field(this.id, this.dimension, this.mowers);
  }
}

class Field {
  constructor(id, dimension, mowers) {
    this.id = id;
    this.dimension = dimension;
    this.mowers = mowers;
  }

  getId() {
    return this.id;
  }

  getDimension() {
    return this.dimension;
  }

  getMowers() {
    return this.mowers;
  }

  static Builder() {
    return new FieldBuilder();
  }
}

module.exports = Field;

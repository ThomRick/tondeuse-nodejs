const FieldId = require('./fieldId');

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

  static withDimension(dimension) {
    return new Field(FieldId.create(), dimension);
  }
}

module.exports = Field;

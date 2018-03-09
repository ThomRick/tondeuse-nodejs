class NewFieldCreated {
  constructor(id, dimension) {
    this.id = id;
    this.dimension = dimension;
  }

  apply(field) {
    return field.applyNew(this);
  }

  getId() {
    return this.id;
  }

  getDimension() {
    return this.dimension;
  }
}

module.exports = NewFieldCreated;

class NewFieldCreated {
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

  apply(field) {
    return field.apply(this);
  }
}

module.exports = NewFieldCreated;

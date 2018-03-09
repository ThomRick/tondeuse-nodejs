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
}

module.exports = NewFieldCreated;

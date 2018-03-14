class NewFieldCreated {
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

  apply(field) {
    return field.applyNew(this);
  }
}

module.exports = NewFieldCreated;

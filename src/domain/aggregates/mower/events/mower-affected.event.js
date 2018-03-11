class MowerAffected {
  constructor(id, field) {
    this.id = id;
    this.field = field;
  }

  getId() {
    return this.id;
  }

  getField() {
    return this.field;
  }

  apply(mower) {
    return mower.applyAffect(this);
  }
}

module.exports = MowerAffected;

class MowerDeployed {
  constructor(id, mower) {
    this.id = id;
    this.mower = mower;
  }

  getId() {
    return this.id;
  }

  getMower() {
    return this.mower;
  }

  apply(field) {
    return field.applyDeploy(this);
  }
}

module.exports = MowerDeployed;

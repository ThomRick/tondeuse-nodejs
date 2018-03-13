const FieldId = require('./field-id');

const NewFieldCreated = require('./events/new-field-created.event');
const MowerDeployed = require('./events/mower-deployed.event');

class FieldBuilder {
  constructor() {}

  withId(id) {
    this.id = id;
    return this;
  }

  withDimension(dimension) {
    this.dimension = dimension;
    return this;
  }

  withMowers(mowers) {
    this.mowers = mowers;
    return this;
  }

  build() {
    if (this.id === undefined) {
      this.id = FieldId.create();
    }
    if (this.dimension === undefined) {
      throw new Error('Dimension must be specified');
    }
    if (this.mowers === undefined) {
      this.mowers = [];
    }
    return new Field(this.id, this.dimension, this.mowers);
  }
}

class Field {
  constructor(id, dimension, mowers) {
    this.uncommittedChanges = [];
    if (id !== undefined && dimension !== undefined && mowers !== undefined) {
      const event = new NewFieldCreated(id, dimension, mowers);
      this.applyNew(event);
      this._saveUncommittedChange(event);
    }
  }

  applyNew(event) {
    this.id = event.getId();
    this.dimension = event.getDimension();
    this.mowers = event.getMowers();
    return this;
  }

  deploy(mower) {
    const event = new MowerDeployed(this.id, mower);
    this.applyDeploy(event);
    this._saveUncommittedChange(event);
  }

  applyDeploy(event) {
    this.mowers.push(event.getMower());
    return this;
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

  getUncommittedChanges() {
    return this.uncommittedChanges;
  }

  static Builder() {
    return new FieldBuilder();
  }

  _saveUncommittedChange(event) {
    this.uncommittedChanges.push(event);
  }

  static rebuild(events) {
    return events.reduce((field, event) => event.apply(field), new Field());
  }
}

module.exports = Field;

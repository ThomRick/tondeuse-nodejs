const MowerId = require('./mowerId');

const NewMowerCreated = require('./events/new-mower-created.event');
const MowerAffected = require('./events/mower-affected.event');
const MowerMovedForward = require('./events/mower-moved.forward.event');
const MowerTurnedLeft = require('./events/mower-turned-left.event');
const MowerTurnedRight = require('./events/mower-turned-right.event');

class MowerBuilder {
  constructor() {}

  withId(id) {
    this.id = id;
    return this;
  }

  withPosition(position) {
    this.positon = position;
    return this;
  }

  withOrientation(orientation) {
    this.orientation = orientation;
    return this;
  }

  build() {
    if (this.id === undefined) {
      this.id = MowerId.create();
    }
    if (this.positon === undefined) {
      throw new Error('Position must be specified');
    }
    if (this.orientation === undefined) {
      throw new Error('Orientation must be specified');
    }
    return new Mower(this.id, this.positon, this.orientation);
  }
}

class Mower {
  constructor(id, position, orientation) {
    this.uncommittedChanges = [];
    if (id !== undefined && position !== undefined && orientation !== undefined) {
      const event = new NewMowerCreated(id, position, orientation);
      this.applyNew(event);
      this._saveUncommittedChange(event);
    }
  }

  applyNew(event) {
    this.id = event.getId();
    this.orientation = event.getOrientation();
    this.position = event.getPosition();
    return this;
  }

  affect(field) {
    const event = new MowerAffected(this.id, field);
    this.applyAffect(event);
    this._saveUncommittedChange(event);
  }

  applyAffect(event) {
    this.field = event.getField();
    return this;
  }

  moveForward() {
    const event = new MowerMovedForward(this.id, this.position.move(this.orientation));
    this.applyMoveForward(event);
    this._saveUncommittedChange(event);
  }

  applyMoveForward(event) {
    this.position = event.getPosition();
    return this;
  }

  turnLeft() {
    const event = new MowerTurnedLeft(this.id, this.orientation.left());
    this.applyTurnLeft(event);
    this._saveUncommittedChange(event);
  }

  applyTurnLeft(event) {
    this.orientation = event.getOrientation();
    return this;
  }

  turnRight() {
    const event = new MowerTurnedRight(this.id, this.orientation.right());
    this.applyTurnRight(event);
    this._saveUncommittedChange(event);
  }

  applyTurnRight(event) {
    return this;
  }

  getId() {
    return this.id;
  }

  getOrientation() {
    return this.orientation;
  }

  getPosition() {
    return this.position;
  }

  getField() {
    return this.field;
  }

  getUncommittedChanges() {
    return this.uncommittedChanges;
  }

  _saveUncommittedChange(event) {
    this.uncommittedChanges.push(event);
  }

  static Builder() {
    return new MowerBuilder();
  }

  static rebuild(events) {
    return events.reduce((mower, event) => event.apply(mower), new Mower());
  }
}

module.exports = Mower;

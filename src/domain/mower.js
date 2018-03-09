const MowerId = require('./mowerId');

const NewMowerCreated = require('./events/new-mower-created.event');
const MowerPlacedOnField = require('./events/mower-placed-on-field.event');
const InstructionExecuted = require('./events/instruction-executed.event');

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
    const event = new NewMowerCreated(id, position, orientation);
    this._apply(event);
    this._saveUncommittedChange(event);
  }

  _apply(event) {
    this.id = event.getId();
    this.orientation = event.getOrientation();
    this.position = event.getPosition();
  }

  placeOn(field) {
    const event = new MowerPlacedOnField(this.id, field);
    this._applyPlaceOn(event);
    this._saveUncommittedChange(event);
  }

  _applyPlaceOn(event) {
    this.field = event.getField();
  }

  execute(instruction) {
    if (this.field === undefined) {
      throw new Error('Mower must be placed on a field before executing instruction.');
    }
    const newState = instruction.applyOn(this);
    const event = new InstructionExecuted(this.id, newState.getPosition(), newState.getOrientation());
    this._applyExecute(event);
    this._saveUncommittedChange(event);
  }

  _applyExecute(event) {
    this.position = event.getPosition();
    this.orientation = event.getOrientation();
  }

  getField() {
    return this.field;
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

  getUncommittedChanges() {
    return this.uncommittedChanges;
  }

  static Builder() {
    return new MowerBuilder();
  }

  _saveUncommittedChange(event) {
    this.uncommittedChanges.push(event);
  }
}

module.exports = Mower;

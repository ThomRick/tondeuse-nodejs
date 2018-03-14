const ProgramId = require('./program-id');

const NewProgramCreated = require('./events/new-program-created.event');

class ProgramBuilder {
  constructor() {}

  withId(id) {
    this.id = id;
    return this;
  }

  withInstructions(instructions) {
    this.instructions = instructions;
    return this;
  }

  withMower(mower) {
    this.mower = mower;
    return this;
  }

  build() {
    if (this.id === undefined) {
      this.id = ProgramId.create();
    }
    if (this.instructions === undefined || this.instructions.length === 0) {
      throw new Error('Instructions must be provided.');
    }
    if (this.mower === undefined) {
      throw new Error('Mower must be provided.');
    }
    return new Program(this.id, this.instructions, this.mower);
  }
}

class Program {
  constructor(id, instructions, mower) {
    this.uncommittedChanges = [];
    if (id !== undefined && instructions !== undefined && mower !== undefined) {
      const event = new NewProgramCreated(id, instructions, mower);
      this.applyNew(event);
      this._saveUncommittedChange(event);
    }
  }

  applyNew(event) {
    this.id = event.getId();
    this.instructions = event.getInstructions();
    this.mower = event.getMower();
    return this;
  }

  getId() {
    return this.id;
  }

  getInstructions() {
    return this.instructions;
  }

  getMower() {
    return this.mower;
  }

  getUncommittedChanges() {
    return this.uncommittedChanges;
  }

  _saveUncommittedChange(event) {
    this.uncommittedChanges.push(event);
  }

  static Builder() {
    return new ProgramBuilder();
  }

  static with(instructions) {
    if (instructions.length === 0) {
      throw new Error('Instructions must be provided.');
    }
    return new Program(ProgramId.create(), instructions);
  }

  static rebuild(events) {
    return events.reduce((program, event) => event.apply(program), new Program());
  }
}

module.exports = Program;

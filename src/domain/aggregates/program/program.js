const ProgramId = require('./program-id');

const NewProgramCreated = require('./events/new-program-created.event');

class Program {
  constructor(id, instructions) {
    this.uncommittedChanges = [];
    if (id !== undefined && instructions !== undefined) {
      const event = new NewProgramCreated(id, instructions);
      this.applyNew(event);
      this._saveUncommittedChange(event);
    }
  }

  applyNew(event) {
    this.id = event.getId();
    this.instructions = event.getInstructions();
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

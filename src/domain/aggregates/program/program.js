const ProgramId = require('./program-id');
const NewProgramCreated = require('./events/new-program-created.event');

class Program {
  constructor(id, instructions) {
    this.uncommittedChanges = [];
    const event = new NewProgramCreated(id, instructions);
    this.applyNew(event);
    this._saveUncommittedChange(event);
  }

  applyNew(event) {
    this.id = event.getId();
    this.instructions = event.getInstructions();
  }

  getId() {
    return this.id;
  }

  getInstructions() {
    return this.instructions;
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
}

module.exports = Program;

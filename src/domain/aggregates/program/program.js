const ProgramId = require('./program-id');

const NewProgramCreated = require('./events/new-program-created.event');
const ProgramInstalled = require('./events/program-installed.event');

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

  install(mower) {
    const event = new ProgramInstalled(this.id, mower);
    this.applyInstall(event);
    this._saveUncommittedChange(event);
  }

  applyInstall(event) {
    this.mower = event.getMower();
    return this;
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

  static rebuild(events) {
    return events.reduce((program, event) => event.apply(program), new Program());
  }
}

module.exports = Program;
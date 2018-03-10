class ProgramDto {
  constructor(id, instructions) {
    this.id = id;
    this.instructions = instructions;
  }

  static from(program) {
    return new ProgramDto(program.getId().getValue(), program.getInstructions());
  }
}

module.exports = ProgramDto;

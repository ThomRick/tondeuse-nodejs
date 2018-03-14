class ProgramDto {
  constructor(id, instructions, mower) {
    this.id = id;
    this.instructions = instructions;
    this.mower = mower;
  }

  static from(program) {
    return new ProgramDto(
      program.getId().getValue(),
      program.getInstructions(),
      program.getMower()
    );
  }
}

module.exports = ProgramDto;

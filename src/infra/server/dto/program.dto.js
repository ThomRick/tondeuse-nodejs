class ProgramDto {
  constructor(id, instructions, mower) {
    this.id = id;
    this.instructions = instructions.map((instruction) => instruction.getValue());
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

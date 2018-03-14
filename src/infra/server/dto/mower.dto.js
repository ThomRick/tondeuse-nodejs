class MowerDto {
  constructor(id, field, position, orientation, program) {
    this.id = id;
    this.field = field;
    this.position = position;
    this.orientation = orientation;
    if (program !== undefined) {
      this.program = program;
    }
  }

  static from(mower) {
    return new MowerDto(
      mower.getId().getValue(),
      mower.getField(),
      mower.getPosition(),
      mower.getOrientation(),
      mower.getProgram()
    );
  }
}

module.exports = MowerDto;

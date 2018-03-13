class MowerDto {
  constructor(id, position, orientation, field) {
    this.id = id;
    this.position = position;
    this.orientation = orientation;
    this.field = field;
  }

  static from(mower) {
    return new MowerDto(mower.getId().getValue(), mower.getPosition(), mower.getOrientation(), mower.getField());
  }
}

module.exports = MowerDto;

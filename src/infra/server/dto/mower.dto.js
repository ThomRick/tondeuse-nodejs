class MowerDto {
  constructor(id, position, orientation) {
    this.id = id;
    this.position = position;
    this.orientation = orientation;
  }

  static from(mower) {
    return new MowerDto(mower.getId().getValue(), mower.getPosition(), mower.getOrientation());
  }
}

module.exports = MowerDto;

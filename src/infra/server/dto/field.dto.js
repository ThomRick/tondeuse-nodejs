class FieldDto {
  constructor(id, dimension, mowers) {
    this.id = id;
    this.dimension = dimension;
    this.mowers = mowers;
  }

  static from(field) {
    return new FieldDto(field.getId().getValue(), field.getDimension(), field.getMowers());
  }
}

module.exports = FieldDto;

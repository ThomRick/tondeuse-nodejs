class FieldDto {
  constructor(id, dimension) {
    this.id = id;
    this.dimension = dimension;
  }

  static from(field) {
    return new FieldDto(field.getId().getValue(), field.getDimension());
  }
}

module.exports = FieldDto;

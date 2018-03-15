const Field = require('../../aggregates/field/field');

class CreateFieldHandler {
  constructor(fieldRepository) {
    this.repository = fieldRepository;
  }

  create(dimension) {
    const field = Field.Builder().withDimension(dimension).build();
    this.repository.save(field);
    return field;
  }
}

module.exports = CreateFieldHandler;

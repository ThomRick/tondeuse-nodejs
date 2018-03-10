const Field = require('./aggregate/field');

class CreateFieldHandler {
  constructor(fieldRepository) {
    this.fieldRepository = fieldRepository;
  }

  createField(dimension) {
    const field = Field.Builder().withDimension(dimension).build();
    this.fieldRepository.save(field);
    return field;
  }
}

module.exports = CreateFieldHandler;

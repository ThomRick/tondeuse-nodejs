class ExtractFieldHandler {
  constructor(fieldRepository) {
    this.fieldRepository = fieldRepository;
  }

  extract() {
    return this.fieldRepository.getAll();
  }
}

module.exports = ExtractFieldHandler;

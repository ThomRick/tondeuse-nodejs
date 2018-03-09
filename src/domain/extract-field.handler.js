class ExtractFieldHandler {
  constructor(fieldRepository) {
    this.fieldRepository = fieldRepository;
  }

  extractAll() {
    return this.fieldRepository.getAll();
  }
}

module.exports = ExtractFieldHandler;

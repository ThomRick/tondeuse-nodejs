class ExtractFieldHandler {
  constructor(repository) {
    this.repository = repository;
  }

  extract(fieldId) {
    if (fieldId !== undefined) {
      return this.repository.get(fieldId);
    } else {
      return this.repository.getAll();
    }
  }
}

module.exports = ExtractFieldHandler;

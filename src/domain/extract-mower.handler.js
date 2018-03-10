class ExtractMowerHandler {
  constructor(mowerRepository) {
    this.mowerRepository = mowerRepository;
  }

  extractAll() {
    return this.mowerRepository.getAll();
  }
}

module.exports = ExtractMowerHandler;

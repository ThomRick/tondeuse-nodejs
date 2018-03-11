class ExtractMowerHandler {
  constructor(mowerRepository) {
    this.mowerRepository = mowerRepository;
  }

  extract() {
    return this.mowerRepository.getAll();
  }
}

module.exports = ExtractMowerHandler;

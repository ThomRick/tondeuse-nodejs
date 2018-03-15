class ExtractMowerHandler {
  constructor(mowerRepository) {
    this.mowerRepository = mowerRepository;
  }

  extract(mowerId) {
    if (mowerId !== undefined && mowerId !== null) {
      return this.mowerRepository.get(mowerId);
    } else {
      return this.mowerRepository.getAll();
    }
  }
}

module.exports = ExtractMowerHandler;

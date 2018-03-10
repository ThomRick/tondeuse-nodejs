const Mower = require('./aggregates/mower/mower');

class CreateMowerHandler {
  constructor(mowerRepository) {
    this.mowerRepository = mowerRepository;
  }

  createMower(position, orientation) {
    const mower = Mower.Builder().withPosition(position).withOrientation(orientation).build();
    this.mowerRepository.save(mower);
    return mower;
  }
}

module.exports = CreateMowerHandler;

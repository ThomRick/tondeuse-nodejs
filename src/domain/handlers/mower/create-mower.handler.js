const Mower = require('../../aggregates/mower/mower');

class CreateMowerHandler {
  constructor(mowerRepository) {
    this.mowerRepository = mowerRepository;
  }

  create(position, orientation, field) {
    const mower = Mower
      .Builder()
      .withPosition(position)
      .withOrientation(orientation)
      .withField(field)
      .build();
    this.mowerRepository.save(mower);
    return mower;
  }
}

module.exports = CreateMowerHandler;

const Mower = require('../../aggregates/mower/mower');
const Position = require('../../aggregates/mower/position');
const Orientation = require('../../aggregates/mower/orientation');

class CreateMowerHandler {
  constructor(mowerRepository) {
    this.mowerRepository = mowerRepository;
  }

  create(position, orientation, field) {
    const mower = Mower
      .Builder()
      .withPosition(Position.at(position.x, position.y))
      .withOrientation(Orientation.from(orientation))
      .withField(field)
      .build();
    this.mowerRepository.save(mower);
    return mower;
  }
}

module.exports = CreateMowerHandler;

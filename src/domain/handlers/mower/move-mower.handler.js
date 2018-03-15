class MoveMowerHandler {
  constructor(repository) {
    this.repository = repository;
  }

  move(mowerId, instruction) {
    const mower = this.repository.get(mowerId);
    switch (instruction) {
      case 'A':
        mower.moveForward();
        break;
      case 'G':
        mower.turnLeft();
        break;
      case 'D':
        mower.turnRight();
        break;
    }
    this.repository.save(mower);
    return mower;
  }
}

module.exports = MoveMowerHandler;

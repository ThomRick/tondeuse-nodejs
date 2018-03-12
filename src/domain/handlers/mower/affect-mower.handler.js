class AffectMowerHandler {
  constructor(repository) {
    this.repository = repository;
  }

  affect(id, field) {
    const mower = this.repository.get(id);
    mower.affect(field);
    this.repository.save(mower);
  }
}

module.exports = AffectMowerHandler;

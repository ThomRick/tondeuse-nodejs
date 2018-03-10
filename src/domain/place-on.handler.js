class PlaceOnHandler {
  constructor(mowerRepository, fieldRepository) {
    this.mowerRepository = mowerRepository;
    this.fieldRepository = fieldRepository;
  }

  placeOn(mowerId, fieldId) {
    const mower = this.mowerRepository.get(mowerId);
    const field = this.fieldRepository.get(fieldId);
    mower.placeOn(field);
    this.mowerRepository.save(mower);
    return mower;
  }
}

module.exports = PlaceOnHandler;

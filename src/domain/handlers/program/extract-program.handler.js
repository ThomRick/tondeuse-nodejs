class ExtractProgramHandler {
  constructor(programRepository) {
    this.programRepository = programRepository;
  }

  extract() {
    return this.programRepository.getAll();
  }
}

module.exports = ExtractProgramHandler;

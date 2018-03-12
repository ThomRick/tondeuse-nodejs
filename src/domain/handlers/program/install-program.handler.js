class InstallProgramHandler {
  constructor(repository) {
    this.repository = repository;
  }

  install(id, mower) {
    const program = this.repository.get(id);
    program.install(mower);
    this.repository.save(program);
  }
}

module.exports = InstallProgramHandler;

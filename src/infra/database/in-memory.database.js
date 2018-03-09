const { InMemoryFieldRepository } = require('./repositories/in-memory-field.repository');
const { InMemoryMowerRepository } = require('./repositories/in-memory-mower.repository');

class InMemoryDatabase {
  constructor(fieldRepository = new InMemoryFieldRepository(), mowerRepository = new InMemoryMowerRepository()) {
    this.fieldRepository = fieldRepository;
    this.mowerRepository = mowerRepository;
  }

  getRepository(name) {
    switch (name) {
      case InMemoryDatabase.FIELD_REPOSITORY:
        return this.fieldRepository;
      case InMemoryDatabase.MOWER_REPOSITORY:
        return this.mowerRepository;
    }
  }

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new InMemoryDatabase();
    }
    return this.instance;
  }
}

InMemoryDatabase.FIELD_REPOSITORY = 'FIELD_REPOSITORY';
InMemoryDatabase.MOWER_REPOSITORY = 'MOWER_REPOSITORY';

module.exports = { InMemoryDatabase };

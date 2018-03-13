const request = require('request');

class DeployMowerHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async deploy(id, mower) {
    console.log(`${ DeployMowerHandler.name }::deploy - id : ${ id } - mower ${ JSON.stringify(mower, null, 2) }`);
    const field = this.repository.get(id);
    return new Promise((resolve) => {
      request.post('/api/mowers', mower, (error, response, mower) => {
        field.deploy(mower);
        this.repository.save(field);
        resolve();
      });
    });
  }
}

module.exports = DeployMowerHandler;

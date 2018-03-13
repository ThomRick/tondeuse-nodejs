const request = require('request');

class DeployMowerHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async deploy(id, mower) {
    const field = this.repository.get(id);
    return new Promise((resolve, reject) => {
      request.post('/api/mowers', mower, (error, response, mower) => {
        field.deploy(mower);
        this.repository.save(field);
        resolve();
      });
    });
  }
}

module.exports = DeployMowerHandler;

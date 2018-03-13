const request = require('request');

class DeployMowerHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async deploy(id, mower) {
    const field = this.repository.get(id);
    mower.field = {
      id: field.getId().getValue()
    };
    return new Promise((resolve) => {
      request.post({
        url: 'http://localhost:3000/api/mowers',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(mower)
      },
      (error, response, createdMower) => {
        field.deploy(JSON.parse(createdMower));
        this.repository.save(field);
        resolve();
      });
    });
  }
}

module.exports = DeployMowerHandler;

const request = require('request');

class InstallProgramHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async install(mowerId, program) {
    const mower = this.repository.get(mowerId);
    program.mower = {
      id: mowerId
    };
    return new Promise((resolve) => {
      request.post({
        url: 'http://localhost:3000/api/programs',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(program)
      }, (error, response, body) => {
        const program = JSON.parse(body);
        mower.install(program);
        this.repository.save(mower);
        resolve(mower);
      });
    });
  }
}

module.exports = InstallProgramHandler;

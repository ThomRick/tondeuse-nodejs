const request = require('request');

class RunProgramHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async run(programId) {
    const program = this.repository.get(programId);
    return new Promise((resolve) => {
      request.get({
        url: `http://localhost:3000/api/mowers/${ program.mower.id }`
      },
      (error, response, body) => {
        resolve(JSON.parse(body));
      });
    }).then((mower) => {
      return new Promise((resolve) => {
        request.get({
          url: `http://localhost:3000/api/fields/${ mower.field.id }`
        },
        (error, response, body) => {
          resolve({
            mower: mower,
            field: JSON.parse(body)
          });
        });
      });
    }).then(({ mower, field }) => {
      const instructions = program.getInstructions();
      return instructions.reduce(async (report, instruction) => {
        return instruction.canExecute(report.mower, field) ? new Promise((resolve) => {
          request.put({
            url: `http://localhost:3000/api/mowers/${ mower.id }?action=move`,
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              instruction: instruction.getValue()
            })
          },
          (error, response, body) => {
            resolve({
              mower: JSON.parse(body)
            });
          });
        }) : Promise.resolve(report);
      }, {
        mower: mower
      });
    });
  }
}

module.exports = RunProgramHandler;

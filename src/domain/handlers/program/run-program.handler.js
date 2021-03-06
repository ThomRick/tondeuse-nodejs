const request = require('request');

class RunProgramHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async run(programId) {
    const program = this.repository.get(programId);
    return this._getMower(program)
      .then((mower) => this._getField(mower))
      .then(({ mower, field }) => this._run(program, field, mower));
  }

  _getMower(program) {
    return new Promise((resolve) => {
      request.get({
        url: `http://localhost:3000/api/mowers/${ program.mower.id }`
      },
      (error, response, body) => {
        resolve(JSON.parse(body));
      });
    });
  }

  _getField(mower) {
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
  }

  _run(program, field, mower) {
    const instructions = program.getInstructions();
    return instructions.reduce(async (reportPromise, instruction) => {
      const report = await reportPromise;
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
    }, Promise.resolve({
      mower: mower
    }));
  }
}

module.exports = RunProgramHandler;

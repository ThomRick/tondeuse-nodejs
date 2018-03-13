const chai = require('chai');
chai.should();

const request = require('request');

describe('Create Program' ,() => {
  it('should return the created program', async () => {
    const program = {
      instructions: [ 'D', 'A', 'G', 'A', 'G' ]
    };
    return new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/api/programs',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(program)
      }, (error, response) => {
        if (error !== undefined && error !== null) {
          reject(error);
        }
        response.statusCode.should.be.equal(201);
        resolve();
      });
    });
  });
});

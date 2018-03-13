const chai = require('chai');
chai.should();

const request = require('request');

describe('Deploy Mower', () => {
  it('should deploy the mower on the identified field', async () => {
    const fieldToCreate = {
      dimension: {
        width: 4,
        length: 4
      }
    };
    return new Promise((resolve, reject) => {
      request.post({
        url: 'http://localhost:3000/api/fields',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(fieldToCreate)
      }, (error, response, body) => {
        if (error !== undefined && error !== null) {
          reject(error);
        }
        resolve(JSON.parse(body));
      });
    }).then((field) => {
      const mowerToDeploy = {
        position: {
          x: 0,
          y: 0
        },
        orientation: 'N'
      };
      return new Promise((resolve, reject) => {
        request.put({
          url: `http://localhost:3000/api/fields/${ field.id }`,
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(mowerToDeploy)
        }, (error, response) => {
          if (error !== undefined && error !== null) {
            reject(error);
          }
          response.statusCode.should.be.equal(200);
          resolve();
        });
      });
    });
  });
});



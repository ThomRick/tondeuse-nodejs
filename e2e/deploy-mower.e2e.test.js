const chai = require('chai');
chai.should();

const request = require('request');

describe('Deploy Mower', () => {
  it('should deploy the mower on the identified field', () => {
    const fieldToCreate = {
      dimension: {
        width: 4,
        length: 4
      }
    };
    return request.post({
      url: 'http://localhost:3000/api/fields',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(fieldToCreate)
    }, (error, response, body) => {
      const field = JSON.parse(body);
      const mowerToDeploy = {
        position: {
          x: 0,
          y: 0
        },
        orientation: 'N'
      };
      return request.put({
        url: `http://localhost:3000/api/fields/${ field.id }`,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(mowerToDeploy)
      }, (error, response) => {
        response.status.should.be.equal(200);
      });
    });
  });
});

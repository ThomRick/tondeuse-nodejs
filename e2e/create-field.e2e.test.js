const chai = require('chai');
chai.should();

const request = require('request');

describe('Create Field', () => {
  it('should return the created field', () => {
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
      response.status.should.be.equal(201);
      JSON.parse(body).should.have.property('id');
      JSON.parse(body).should.have.property('dimension', {
        width: 4,
        length: 4
      });
    });
  });
});

const chai = require('chai');
chai.should();

const request = require('request');

describe('Run Program', () => {
  it('should return the mower description after running the program', () => {
    const field = {
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
        body: JSON.stringify(field)
      }, (error, response, body) => {
        if (error !== undefined && error !== null) {
          reject(new Error('Can not create field : ' + error));
        }
        resolve(JSON.parse(body));
      });
    }).then((field) => {
      const mower = {
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
          body: JSON.stringify(mower)
        }, (error, response, body) => {
          if (error !== undefined && error !== null) {
            reject(new Error('Can not deploy mower : ' + error));
          }
          resolve(JSON.parse(body));
        });
      }).then((field) => {
        const program = {
          instructions: [ 'D', 'A', 'G', 'A', 'G' ]
        };
        const mower = field.mowers[0];
        return new Promise((resolve, reject) => {
          request.put({
            url: `http://localhost:3000/api/mowers/${ mower.id }?action=install`,
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(program)
          }, (error, response, body) => {
            if (error !== undefined && error !== null) {
              reject(new Error('Can not install program : ' + error));
            }
            response.statusCode.should.be.equal(200);
            const mower = JSON.parse(body);
            resolve(mower.program);
          });
        }).then((program) => {
          return new Promise((resolve, reject) => {
            request.put({
              url: `http://localhost:3000/api/programs/${ program.id }`,
              headers: {
                'content-type': 'application/json'
              }
            }, (error, response, body) => {
              if (error !== undefined && error !== null) {
                reject('Can not execute program : ' + error);
              }
              const report = JSON.parse(body);
              resolve();
            });
          });
        });
      });
    });
  });
});
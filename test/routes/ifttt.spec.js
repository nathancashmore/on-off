const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');

const server = require('../../app/app');

chai.use(chaiHttp);

describe('IFTTT Routes', () => {
  it('should provide status', (done) => {
    const endpoint = '/ifttt/v1/status';

    chai.request(server)
      .get(endpoint)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should provide action status', (done) => {
    const endpoint = '/ifttt/v1/actions/switch';

    const requestBody = {
      "actionFields": {
        "state": "string"
      },
      "user": {
        "id": 0,
        "timezone": "string"
      },
      "ifttt_source": {
        "id": "string",
        "url": "string"
      }
    }

    chai.request(server)
      .post(endpoint)
      .send(requestBody)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

});

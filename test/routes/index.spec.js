const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');

const server = require('../../app/app');

chai.use(chaiHttp);

describe('On-Off Routes', () => {
  it('should provide ON status', (done) => {
    const endpoint = '/on';

    chai.request(server)
      .get(endpoint)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.contain('ON');
        done();
      });
  });

  it('should provide OFF status', (done) => {
    const endpoint = '/off';

    chai.request(server)
      .get(endpoint)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.contain('OFF');
        done();
      });
  });

  it('should 404 if endpoint not found', (done) => {
    const endpoint = '/not-found';

    chai.request(server)
      .get(endpoint)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

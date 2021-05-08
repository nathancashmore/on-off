const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');

const server = require('../../app/app');

const VALID_KEY = 'XXXX';
const INVALID_KEY = 'INVALID';

chai.use(chaiHttp);

describe('IFTTT', () => {
  it('should provide IFTTT with 200 valid status', (done) => {
    const endpoint = '/ifttt/v1/status';

    chai.request(server)
      .get(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', VALID_KEY)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should provide IFTTT with 401 invalid status', (done) => {
    const endpoint = '/ifttt/v1/status';

    chai.request(server)
      .get(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', INVALID_KEY)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should provide IFTTT with 200 response for /test/setup', (done) => {
    const endpoint = '/ifttt/v1/test/setup';

    chai.request(server)
      .post(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', VALID_KEY)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should provide IFTTT with 401 response for /test/setup when invalid key', (done) => {
    const endpoint = '/ifttt/v1/test/setup';

    chai.request(server)
      .post(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', INVALID_KEY)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should provide IFTTT with 200 response for /actions/switch', (done) => {
    const endpoint = '/ifttt/v1/actions/switch';

    const payload = {
      actionFields: {
        state: 'ON'
      },
      user: {
        id: 1,
        timezone: 'Europe/London'
      },
      ifttt_source: {
        id: '1',
        url: 'https://ifttt.com/fairy-light/1'
      }
    };

    chai.request(server)
      .post(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', VALID_KEY)
      .send(payload)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should provide IFTTT with 401 response for /actions/switch when invalid key', (done) => {
    const endpoint = '/ifttt/v1/actions/switch';

    const payload = {
      actionFields: {
        state: 'ON'
      },
      user: {
        id: 1,
        timezone: 'Europe/London'
      },
      ifttt_source: {
        id: '1',
        url: 'https://ifttt.com/fairy-light/1'
      }
    };

    chai.request(server)
      .post(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', INVALID_KEY)
      .send(payload)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should provide IFTTT with 400 response for /actions/switch when no actionFields', (done) => {
    const endpoint = '/ifttt/v1/actions/switch';

    const payload = {
      actionFields: {},
      user: {
        id: 1,
        timezone: 'Europe/London'
      },
      ifttt_source: {
        id: '1',
        url: 'https://ifttt.com/fairy-light/1'
      }
    };

    chai.request(server)
      .post(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', VALID_KEY)
      .send(payload)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].message).to.equal('Invalid actionFields');
        done();
      });
  });

  it('should provide IFTTT with 400 response for /actions/switch when invalid state', (done) => {
    const endpoint = '/ifttt/v1/actions/switch';

    const payload = {
      actionFields: {
        state: 'RUBBISH'
      },
      user: {
        id: 1,
        timezone: 'Europe/London'
      },
      ifttt_source: {
        id: '1',
        url: 'https://ifttt.com/fairy-light/1'
      }
    };

    chai.request(server)
      .post(endpoint)
      .set('Accept', 'application/json')
      .set('IFTTT-Service-Key', VALID_KEY)
      .send(payload)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].message).to.equal('Invalid state for action, must be ON or OFF');
        done();
      });
  });
});

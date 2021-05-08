const chai = require('chai');

const { expect } = chai;

const HttpError = require('../../app/model/httpError');

const MESSAGE = 'Somthing went wrong';

describe('Http Error Handler', () => {
  it('should construct unauthorized message', async () => {
    const error = new HttpError(MESSAGE).unauthorized;
    expect(error.message).to.equal(MESSAGE);
    expect(error.status).to.equal(401);
  });

  it('should construct bad request message', async () => {
    const error = new HttpError(MESSAGE).badRequest;
    expect(error.message).to.equal(MESSAGE);
    expect(error.status).to.equal(400);
  });

  it('should construct conflict message', async () => {
    const error = new HttpError(MESSAGE).conflict;
    expect(error.message).to.equal(MESSAGE);
    expect(error.status).to.equal(409);
  });

  it('should construct not found message', async () => {
    const error = new HttpError(MESSAGE).notFound;
    expect(error.message).to.equal(MESSAGE);
    expect(error.status).to.equal(404);
  });
});

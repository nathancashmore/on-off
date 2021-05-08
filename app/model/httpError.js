module.exports = class HttpError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }

  get unauthorized() {
    this.status = 401;
    return this;
  }

  get badRequest() {
    this.status = 400;
    return this;
  }

  get notFound() {
    this.status = 404;
    return this;
  }

  get conflict() {
    this.status = 409;
    return this;
  }

  static ErrorWithStatus(message) {
    return new HttpError(message);
  }
};

/* eslint-disable linebreak-style */

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = ServerError;

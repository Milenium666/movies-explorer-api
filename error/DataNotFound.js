/* eslint-disable linebreak-style */
class DataNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = DataNotFound;

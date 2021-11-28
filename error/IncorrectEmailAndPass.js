/* eslint-disable linebreak-style */

class IncorrectEmailAndPass extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = IncorrectEmailAndPass;

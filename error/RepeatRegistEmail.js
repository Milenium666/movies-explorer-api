/* eslint-disable linebreak-style */

class RepeatRegistEmail extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = RepeatRegistEmail;

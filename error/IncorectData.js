/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */

class IncorectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = IncorectData;

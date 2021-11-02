const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const validator = require('validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [{ validator: (value) => isEmail(value), msg: 'Invalid email.' }],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },

});
module.exports = mongoose.model('user', userSchema);
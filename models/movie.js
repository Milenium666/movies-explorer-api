const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('movie', movieSchema);

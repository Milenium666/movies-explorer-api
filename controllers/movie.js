const Movie = require('../models/movie');

const {
  OK,
  INCORECT_DATA_CREATE_MOVIE,
  NO_MOVIE_WITH_SUCH_ID,
  NO_RIGTHS_DELETE_SOMEONE_MOVIE,
  IS_VALID,
} = require('../utils/constans');

const IncorectData = require('../error/IncorectData');
const DataNotFound = require('../error/DataNotFound');
const NoRight = require('../error/NoRight');

const getMovies = (req, res, next) => {
  const userId = req.user.id;
  Movie.find({ owner: userId })
    .then((movie) => res.status(OK).send({ movie }))
    .catch(next);
};

function createMovie(req, res, next) {
  const {
    country,
    director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user.id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(OK).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorectData(INCORECT_DATA_CREATE_MOVIE));
      }
      next(err);
    });
}

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user.id;

  Movie.findById(movieId)
    .then(((movie) => {
      if (!movie) {
        next(new DataNotFound(NO_MOVIE_WITH_SUCH_ID));
      } if (userId !== movie.owner.toString()) {
        next(new NoRight(NO_RIGTHS_DELETE_SOMEONE_MOVIE));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.status(OK).send(movie));
      }
    }))
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new DataNotFound(IS_VALID));
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

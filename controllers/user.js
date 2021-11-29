const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  OK,
  salt,
  RE_REGISTRATION,
  INCORECT_DATA_REG_USER,
  SERVER_ERROR,
  INCORRECT_EMAIL_AND_PASSWORD,
  JWT_KEY_SEKRET,
  NO_USER_WITH_SUCH_ID,
  IS_VALID,
  INCORECT_DATA_USER_UPDATE,

} = require('../utils/constans');

const RepeatRegistEmail = require('../error/RepeatRegistEmail');
const IncorectData = require('../error/IncorectData');
const ServerError = require('../error/ServerError');
const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');
const DataNotFound = require('../error/DataNotFound');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new RepeatRegistEmail(RE_REGISTRATION));
      }
      bcrypt.hash(password, salt)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
        }))
        .then(() => {
          res.status(OK).send({ email, name });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new IncorectData(INCORECT_DATA_REG_USER));
          }
          next(new ServerError(SERVER_ERROR));
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new IncorrectEmailAndPass(INCORRECT_EMAIL_AND_PASSWORD));
      } else {
        bcrypt.compare(password, salt, (isValid) => {
          if (!isValid) {
            next(new IncorrectEmailAndPass(INCORRECT_EMAIL_AND_PASSWORD));
          } else {
            const token = jwt.sign(
              { id: user._id },
              JWT_KEY_SEKRET,
              { expiresIn: '7d' },
            );
            res.status(OK).send({ token });
          }
        });
      }
    })
    .catch(() => {
      next(new ServerError(SERVER_ERROR));
    });
};

const getInfoUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        next(new DataNotFound(NO_USER_WITH_SUCH_ID));
      }
      res.status(OK).send(user);
    })
    .catch(() => {
      next(new ServerError(SERVER_ERROR));
    });
};
const updateInfoUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user.id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        next(new DataNotFound(NO_USER_WITH_SUCH_ID));
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new DataNotFound(IS_VALID));
      } if (err.name === 'ValidationError') {
        next(new IncorectData(INCORECT_DATA_USER_UPDATE));
      }
    });
};

module.exports = {
  createUser,
  login,
  getInfoUser,
  updateInfoUser,
};

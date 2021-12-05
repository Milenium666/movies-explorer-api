const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

const {
  salt,
  RE_REGISTRATION,
  INCORECT_DATA_REG_USER,
  INCORRECT_EMAIL_AND_PASSWORD,
  NO_USER_WITH_SUCH_ID,
  IS_VALID,
  INCORECT_DATA_USER_UPDATE,

} = require('../utils/constans');

dotenv.config();
const { NODE_ENV, JWT_KEY_SEKRET } = process.env;

const RepeatRegistEmail = require('../error/RepeatRegistEmail');
const IncorectData = require('../error/IncorectData');
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
          res.send({ email, name });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new IncorectData(INCORECT_DATA_REG_USER));
          } else {
            next(err);
          }
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
              NODE_ENV === 'production' ? JWT_KEY_SEKRET : 'super-strong-secret',
              { expiresIn: '7d' },
            );
            res.send({ token });
          }
        });
      }
    })
    .catch(next);
};

const getInfoUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        next(new DataNotFound(NO_USER_WITH_SUCH_ID));
      }
      res.send(user);
    })
    .catch(next);
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
      } if (!name || !email) {
        next(new IncorectData(INCORECT_DATA_USER_UPDATE));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new RepeatRegistEmail(RE_REGISTRATION));
      }
      if (err.name === 'ReferenceError') {
        next(new DataNotFound(IS_VALID));
      } else {
        console.log(err);
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getInfoUser,
  updateInfoUser,
};

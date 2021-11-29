//!!! найти информацию EN


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  OK,
  salt,
  RE_REGISTRATION,
  INCORECT_DATA,
  SERVER_ERROR,
  THE_FIELD_IS_NOT_FILLED,
  INCORRECT_EMAIL_AND_PASSWORD,
  JWT_KEY_SEKRET,
} = require('../utils/constans');

const RepeatRegistEmail = require('../error/RepeatRegistEmail');
const IncorectData = require('../error/IncorectData');
const ServerError = require('../error/ServerError');
const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');

//!!решить баг если поле не заполнено(после установки joi)
const createUser = (req, res, next) => {
  const { email, password, name } = req.body
  User.findOne({ email })
    .then((user) => {
      if(user) {
        return next(new RepeatRegistEmail(RE_REGISTRATION));
      }
      bcrypt.hash(password, salt)
        .then(hash => User.create({
          email: req.body.email,
          password: hash,
          name: req.body.name,
        }))
          .then(({ email, _id, name }) => res.status(OK).send({ email, _id, name }))
          .catch((err) => {
            if(err.name === 'ValidationError') {
              return next(new IncorectData(INCORECT_DATA));
            }
            next(new ServerError(SERVER_ERROR));
          });
    })
    .catch(next);
};


const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new IncorectData(THE_FIELD_IS_NOT_FILLED));
  } User.findOne({email}).select('+password')
      .then((user) => {
        if(!user) {
          next(new IncorrectEmailAndPass(INCORRECT_EMAIL_AND_PASSWORD));
        } else {
          return bcrypt.compare(password, salt, (isValid) => {
            if(!isValid) {
              next(new IncorrectEmailAndPass(INCORRECT_EMAIL_AND_PASSWORD))
            } else {
              const token = jwt.sign({ id: user._id },
              JWT_KEY_SEKRET,
              { expiresIn: '7d' });
              return res.status(OK).send({ token });
              }
          })
        }
      })
      .catch(() => {
        next(new ServerError(SERVER_ERROR));
      });
};

const getInfoUser = (req, res, next) => {

};
const updateInfoUser = (req, res, next) => {

};






module.exports = {
  createUser,
  login,
  getInfoUser,
  updateInfoUser,
}
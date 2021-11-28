const bcrypt = require('bcryptjs')

const User = require('../models/user');
const {
  OK,
  salt,
  RE_REGISTRATION,
  INCORECT_DATA,
  SERVER_ERROR,
} = require('../utils/constans');
const RepeatRegistEmail = require('../error/RepeatRegistEmail');

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
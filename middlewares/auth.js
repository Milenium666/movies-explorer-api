const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');

dotenv.config();
const { JWT_KEY_SEKRET, NODE_ENV } = process.env;
const {
  AUTHORIZATION_REQUIRED,
} = require('../utils/constans');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new IncorrectEmailAndPass(AUTHORIZATION_REQUIRED));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_KEY_SEKRET : 'super-strong-secret');
  } catch (err) {
    next(new IncorrectEmailAndPass(AUTHORIZATION_REQUIRED));
  }

  req.user = payload;

  next();
};

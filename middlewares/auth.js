const jwt = require('jsonwebtoken');

const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');

const {
  JWT_KEY_SEKRET,
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
    payload = jwt.verify(token, JWT_KEY_SEKRET);
  } catch (err) {
    next(new IncorrectEmailAndPass(AUTHORIZATION_REQUIRED));
  }

  req.user = payload;

  next();
};

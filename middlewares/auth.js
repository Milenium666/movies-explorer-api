const jwt = require('jsonwebtoken');

const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');

//const { JWT_KEY_SEKRET, NODE_ENV } = process.env;
const { JWT_SECRET, NODE_ENV } = process.env;

console.log(JWT_SECRET , '1');

const {
  AUTHORIZATION_REQUIRED,
  JWT_KEY,
} = require('../utils/constans');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new IncorrectEmailAndPass(AUTHORIZATION_REQUIRED));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    //payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_KEY_SEKRET : JWT_KEY);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_KEY);
    console.log(JWT_SECRET, '2');

  } catch (err) {
    next(new IncorrectEmailAndPass(AUTHORIZATION_REQUIRED));
  }

  req.user = payload;

  return next();
};

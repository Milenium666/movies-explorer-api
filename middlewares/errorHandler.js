const { SERVER_ERROR, STATUS_500 } = require('../utils/constans');

const errorHandler = (err, req, res, next) => {
  const { statusCode = STATUS_500, message } = err;

  res.status(statusCode).send({ message: statusCode === STATUS_500 ? SERVER_ERROR : message });
  next();
};

module.exports = { errorHandler };

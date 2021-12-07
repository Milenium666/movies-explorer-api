const router = require('express').Router();
const DataNotFound = require('../error/DataNotFound');
const { REQ_NON_EXISTENT_ADDRESS } = require('../utils/constans');

router.use('/', (req, res, next) => {
  next(new DataNotFound(REQ_NON_EXISTENT_ADDRESS));
});

module.exports = router;

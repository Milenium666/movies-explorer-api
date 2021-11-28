const router = require('express').Router();

router.use('./user', require('./user'))
router.use('./movie', require('./movie'));

module.exports = router;
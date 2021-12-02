const router = require('express').Router();

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/validateCelebrate');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/', auth, require('./user'));
router.use('/', auth, require('./movie'));

module.exports = router;

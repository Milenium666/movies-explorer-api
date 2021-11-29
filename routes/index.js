const router = require('express').Router();

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/', auth, require('./user'));
router.use('/', auth, require('./movie'));

module.exports = router;

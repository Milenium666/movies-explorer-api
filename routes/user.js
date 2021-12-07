const router = require('express').Router();

const {
  getInfoUser,
  updateInfoUser,
} = require('../controllers/user');

const { validateUpdateInfoUser } = require('../middlewares/validateCelebrate');

router.get('/users/me', getInfoUser);
router.patch('/users/me', validateUpdateInfoUser, updateInfoUser);

module.exports = router;

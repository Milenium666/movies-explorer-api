const router = require('express').Router();

const {
  getInfoUser,
  updateInfoUser,
} = require('../controllers/user')

router.get('/users/me', getInfoUser)
router.patch('/users/me', updateInfoUser)

module.exports = router;
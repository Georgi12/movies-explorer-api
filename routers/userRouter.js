const router = require('express').Router();
const { updateUserCheck } = require('../validators/userValidators');
const { getUserMe, updateUser } = require('../contrillers/userController');

router.get('/me', getUserMe);
router.patch('/me', updateUserCheck, updateUser);

module.exports = router;

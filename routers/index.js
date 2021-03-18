const router = require('express').Router();
const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const auth = require('../middleware/auth');
const { loginUserCheck, createUserCheck } = require('../validators/userValidators');
const { createUser, loginUser } = require('../contrillers/userController');
const errorRouter = require('./errorRouter');

router.post('/signup', createUserCheck, createUser);
router.post('/signin', loginUserCheck, loginUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/', errorRouter);

module.exports = router;

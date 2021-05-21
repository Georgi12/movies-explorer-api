const router = require('express').Router();
const { errorMessages } = require('../helper/constants');
const { NotFoundError } = require('../errors/errorClases');

router.all(
  '/*',
  (req, res, next) => Promise.reject(
    new NotFoundError(errorMessages.notFoundResource),
  )
    .catch(next),

);
module.exports = router;

const router = require('express').Router();
const { NotFoundError } = require('../errors/errorClases');

router.all(
  '/*',
  (req, res, next) => Promise.reject(
    new NotFoundError('Запрашиваемый ресурс не найден'),
  )
    .catch(next),

);
module.exports = router;

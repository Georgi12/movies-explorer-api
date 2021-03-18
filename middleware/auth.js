const jwt = require('jsonwebtoken');
const jwtPassword = require('../helper/jwtSetter');
const { AuthError } = require('../errors/errorClases');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtPassword);
  } catch (err) {
    throw new AuthError('Ошибка авторизации');
  }

  req.user = payload;

  next();
  return false;
};

module.exports = auth;

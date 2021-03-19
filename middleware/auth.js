const jwt = require('jsonwebtoken');
const jwtPassword = require('../helper/jwtSetter');
const { errorMessages } = require('../helper/constants');
const { AuthError } = require('../errors/errorClases');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(errorMessages.authError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtPassword);
  } catch (err) {
    throw new AuthError(errorMessages.authError);
  }

  req.user = payload;

  next();
  return false;
};

module.exports = auth;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtPassword = require('../helper/jwtSetter');
const { NotFoundError, DuplicateError } = require('../errors/errorClases');

const getUserMe = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользоваель с таким id не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Пользоваель с таким id не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return Promise.reject(new DuplicateError('Аккаунт с таким email уже существует'));
      }
      return err;
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        jwtPassword,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserMe, updateUser, createUser, loginUser,
};

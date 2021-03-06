const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { errorMessages } = require('../helper/constants');
const { AuthError } = require('../errors/errorClases');

mongoose.set('toObject', { useProjection: false });
mongoose.set('toJSON', { useProjection: true });

const userModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле email должно быть валидеым email адресом',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userModel.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(errorMessages.authUserError));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(errorMessages.authUserError));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userModel);

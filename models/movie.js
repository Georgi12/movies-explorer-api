const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
    default: '',
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле image должно быть валидным URL-адресом',
    },
  },

  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле trailer должно быть валидным URL-адресом',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле thumbnail должно быть валидным URL-адресом',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },

  nameEN: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },

});

module.exports = mongoose.model('movie', movieSchema);

const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const createMovieCheck = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailer: Joi.string().uri().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.objectId().required(),
  }),
});

const deleteMovieCheck = celebrate({
  body: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
});

module.exports = { createMovieCheck, deleteMovieCheck };

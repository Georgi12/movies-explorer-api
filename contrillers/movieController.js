const Movie = require('../models/movie');
const { errorMessages } = require('../helper/constants');
const { UserResponseError } = require('../errors/errorClases');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ owner: req.user._id, _id: req.body.movieId })
    .orFail(() => new UserResponseError(errorMessages.notFoundMovie))
    .then((movie) => {
      movie.remove();
      return res.json({ message: 'Фильм удален' });
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };

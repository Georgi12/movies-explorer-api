const router = require('express').Router();
const { createMovieCheck, deleteMovieCheck } = require('../validators/movieValidators');
const { getMovies, createMovie, deleteMovie } = require('../contrillers/movieController');

router.get('/', getMovies);
router.post('/', createMovieCheck, createMovie);
router.delete('/:movieId', deleteMovieCheck, deleteMovie);

module.exports = router;

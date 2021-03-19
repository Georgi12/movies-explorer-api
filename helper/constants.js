const errorMessages = {
  duplicateError: 'Аккаунт с таким email уже существует',
  authUserError: 'Неправильные почта или пароль',
  notFoundResource: 'Запрашиваемый ресурс не найден',
  notFoundMovie: 'Фильм не найден либо вам не принадлежит',
  notFoundUser: 'Пользоваель с таким id не найден',
  authError: 'Ошибка авторизации',

};

const mongoServer = 'mongodb://localhost:27017/moviedb';

module.exports = { errorMessages, mongoServer };

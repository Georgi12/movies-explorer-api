const options = {
  origin: [
    'http://localhost:8000',
    'https://api.mymoviesfinder.students.nomoredomains.icu',
    'http://api.mymoviesfinder.students.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = options;

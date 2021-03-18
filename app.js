const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routers');
const errorHandler = require('./middleware/errorHandler');
const options = require('./helper/corsOptions');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 8000, MONGO_URL = 'mongodb://localhost:27017/moviedb' } = process.env;

const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);

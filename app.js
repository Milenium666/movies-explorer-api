const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
require('dotenv').config();

const corsOption = require('./middlewares/cors');
const { DB } = require('./utils/constans');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000, NODE_ENV, DB_PODUCTION } = process.env;

const app = express();
app.use(corsOption);

app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser());
console.log(NODE_ENV);
mongoose.connect(NODE_ENV === 'production' ? DB_PODUCTION : DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

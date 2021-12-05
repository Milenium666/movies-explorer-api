const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');

const corsOption = require('./middlewares/cors');
const { DB } = require('./utils/constans');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();
app.use(corsOption);

app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser());

mongoose.connect(DB, {
  useNewUrlParser: true,
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

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const corsOption = require('./middlewares/cors');
const { DB, REQ_NON_EXISTENT_ADDRESS } = require('./utils/constans');
const DataNotFound = require('./error/DataNotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 8080 } = process.env;

const app = express();
app.use(corsOption);

app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser());

mongoose.connect(DB, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  next(new DataNotFound(REQ_NON_EXISTENT_ADDRESS));
});
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

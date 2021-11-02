const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const cors = require('./middlewares/cors');

const { PORT = 8080 } = process.env;

const app = express();

app.use(cors);

app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
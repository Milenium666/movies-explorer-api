const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { createUser, login } = require('./controllers/user')

const { PORT = 8080 } = process.env;

const app = express();



app.use(express.json()); // для собирания JSON-формата
app.use(cookieParser());


mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.post('/signup', createUser);
app.post('/signin', login);
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
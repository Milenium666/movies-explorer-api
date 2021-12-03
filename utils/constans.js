const OK = 200;
const STATUS_500 = 500;
const salt = 10;

const DB = 'mongodb://localhost:27017/moviesdb';

const RE_REGISTRATION = 'Пользователь с таким Email уже есть в системе';
const INCORECT_DATA_REG_USER = 'Введены некрректные данные при создании пользователя';
const SERVER_ERROR = 'Ошибка на стороне сервера';
const INCORRECT_EMAIL_AND_PASSWORD = 'Передан неверный Email или Пароль';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const NO_USER_WITH_SUCH_ID = 'Нет пользователя с таким ID';
const IS_VALID = 'Невалидный ID';
const INCORECT_DATA_USER_UPDATE = 'Введены некрректные данные при обновлении данных пользователя';
const INCORECT_DATA_CREATE_MOVIE = 'Введены некрректные данные при создании фильма';
const NO_MOVIE_WITH_SUCH_ID = 'Нет фильма с таким ID';
const NO_RIGTHS_DELETE_SOMEONE_MOVIE = 'Нет прав для удаления ';
const REQ_NON_EXISTENT_ADDRESS = 'Запрос на несуществующий адрес';

module.exports = {
  OK,
  salt,
  RE_REGISTRATION,
  INCORECT_DATA_REG_USER,
  SERVER_ERROR,
  INCORRECT_EMAIL_AND_PASSWORD,
  AUTHORIZATION_REQUIRED,
  NO_USER_WITH_SUCH_ID,
  IS_VALID,
  INCORECT_DATA_USER_UPDATE,
  INCORECT_DATA_CREATE_MOVIE,
  NO_MOVIE_WITH_SUCH_ID,
  NO_RIGTHS_DELETE_SOMEONE_MOVIE,
  DB,
  STATUS_500,
  REQ_NON_EXISTENT_ADDRESS,
};

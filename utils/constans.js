const OK = 200;
const salt = 10;

const JWT_KEY_SEKRET = 'super-strong-secret';

const RE_REGISTRATION = 'Пользователь с таким Email уже есть в системе';
const INCORECT_DATA = 'Введены некрректные данные при создании пользователя';
const SERVER_ERROR = 'Ошибка на стороне сервера';
const THE_FIELD_IS_NOT_FILLED = 'Поле не заполнено';
const INCORRECT_EMAIL_AND_PASSWORD = 'Передан неверный Email или Пароль';

module.exports = {
  OK,
  salt,
  RE_REGISTRATION,
  INCORECT_DATA,
  SERVER_ERROR,
  THE_FIELD_IS_NOT_FILLED,
  INCORRECT_EMAIL_AND_PASSWORD,
  JWT_KEY_SEKRET,
}
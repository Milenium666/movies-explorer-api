const OK = 200;
const salt = 10;

const JWT_KEY_SEKRET = 'super-strong-secret';

const RE_REGISTRATION = 'Пользователь с таким Email уже есть в системе';
const INCORECT_DATA_REG_USER = 'Введены некрректные данные при создании пользователя';
const SERVER_ERROR = 'Ошибка на стороне сервера';
const INCORRECT_EMAIL_AND_PASSWORD = 'Передан неверный Email или Пароль';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const NO_USER_WITH_SUCH_ID = 'Нет пользователя с таким ID';
const IS_VALID = 'Невалидный ID';
const INCORECT_DATA_USER_UPDATE = 'Введены некрректные данные при обновлении данных пользователя';

module.exports = {
  OK,
  salt,
  RE_REGISTRATION,
  INCORECT_DATA_REG_USER,
  SERVER_ERROR,
  INCORRECT_EMAIL_AND_PASSWORD,
  JWT_KEY_SEKRET,
  AUTHORIZATION_REQUIRED,
  NO_USER_WITH_SUCH_ID,
  IS_VALID,
  INCORECT_DATA_USER_UPDATE,
};

const OK = 200;
const salt = 10;

const RE_REGISTRATION = 'Пользователь с таким Email уже есть в системе';
const INCORECT_DATA = 'Введены некрректные данные при создании пользователя';
const SERVER_ERROR = 'Ошибка на стороне сервера';

module.exports = {
  OK,
  salt,
  RE_REGISTRATION,
  INCORECT_DATA,
  SERVER_ERROR,
}
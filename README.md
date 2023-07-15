***Backend дипломного проекта "Movies Explorer"***
==================================================
## Стек технологий:<br>
* `Express.js`<br>
* `mongoDB`<br>

## Тестирование
Протестировать проект можно через приложение `Postman`<br>
https://movies-explorer.elena.nomoredomains.rocks/api<br/>

* по маршруту `/signup` можно зарегистрироваться. Обязательные поля `name` `email` `password`. Метод `POST`
* по маршруту `/signin` можно авторизоваться. Обязательные поля `email` `password`.  Метод `POST`
* по маршруту `/users/me` можно посмотреть информацию о пользователе. Метод `GET`
* по маршруту `/users/me` можно изменить информацию о пользователе. Обязательные поля `name` `email`. Метод `PATCH` 
* по маршруту `/movies` можно добавить фильм. Обязательные поля `country` `director` `duration` `year` `description` `image` `trailerLink` `thumbnail` `movieId` `nameRU` `nameEN`         Метод `POST`
* по маршруту `/movies/:movieId` можно удалить добавленный вами фильм. Метод `DELETE`

Логин: test@test.ru<br>
Пароль: test@test.ru<br>

## Инструкция по развёртыванию:<br>
  1. Клонировать репозиторий к себе<br>
  2. Установить зависимости `npm install`<br>
  3. Запустить проект `npm start`<br>

## ***Проект закончен***

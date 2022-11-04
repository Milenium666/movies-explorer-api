***Backend дипломного проекта "Movies Explorer"***
==================================================
## Описание проекта:
Использованный технологический стек: `Express.js`, `mongoDB`, `Git`<br>
Протестировать проект можно через приложение `Postman`<br>
[Домен сервера](https://movies-explorer.elena.nomoredomains.rocks/api)<br/>
Публичный IP-адрес сервера: 51.250.15.51

* по маршруту `/signup` можно зарегистрироваться. Обязательные поля `name` `email` `password`. Метод `POST`
* по маршруту `/signin` можно авторизоваться. Обязательные поля `email` `password`.  Метод `POST`
* по маршруту `/users/me` можно посмотреть информацию о пользователе. Метод `GET`
* по маршруту `/users/me` можно изменить информацию о пользователе. Обязательные поля `name` `email`. Метод `PATCH` 
* по маршруту `/movies` можно добавить фильм. Обязательные поля `country` `director` `duration` `year` `description` `image` `trailerLink` `thumbnail` `movieId` `nameRU` `nameEN`         Метод `POST`
* по маршруту `/movies/:movieId` можно удалить добавленный вами фильм. Метод `DELETE` 
  
## ***Проект закончен***

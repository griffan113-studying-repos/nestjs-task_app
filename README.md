<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Description:

Tasks app back-end made in NestJS, an application with tasks management by ID and users, with Auth system made with Passport and JWT.

# Technologies:

> NestJS
> PostgresSQL
> TypeORM
> JWT
> Passport

# Routing:

## Tasks Controller:

| Route             | Job                           | Method |
| ----------------- | ----------------------------- | ------ |
| /tasks            | Retrieve all user tasks       | GET    |
| /tasks            | Create a new task             | POST   |
| /tasks/:id        | Retrieve an unique task by id | GET    |
| /tasks/:id        | Delete an unique task by id   | DELETE |
| /tasks/:id/status | Update a task status by id    | PATCH  |

## Auth Controller:

| Route        | Job                             | Method |
| ------------ | ------------------------------- | ------ |
| /auth/signin | Log in with an existing account | POST   |
| /auth/signup | Create an new user account      | POST   |

## Description

API para utilização em um CRUD de livros.

A API disponibiliza ferramentas para cadastros, atualização, busca e remoção de livros de um banco de dados.

## Installation

```bash
$ yarn install
```

## Running the app

Necessário um banco de dados postgres para o funcionamento


Comando para subir um banco de dados postgres com Docker já com as configurações padrões em .env
```bash
docker run -d -p 5444:5432 --name my-postgres -e POSTGRES_PASSWORD=password POSTGRES_DB=book_master postgres
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test
```

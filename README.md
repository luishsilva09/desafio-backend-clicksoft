<h1 align="center">Desafio clicksoft</h1>

<div align="center">
  
  
  
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>

# Descrição

Controle de alocação de salas para seus professores e alunos.

# Features

- Estudante
- Professor
- Sala

# Referência API

# Estudante

### Registro estudante:

```http
    POST /student
```

Request:

| Body           | Type     | Description                             |
| -------------- | -------- | --------------------------------------- |
| `name`         | `String` | **Required** nome estudante             |
| `email`        | `String` | **Required** email estudante            |
| `registration` | `Number` | **Required** matricula estudante        |
| `birthDate`    | `String` | **Required** data aniversario estudante |

</br>

### Buscar estudante:

```http
    GET /student/:{id}
```

| Params | Type     | Description                  |
| ------ | -------- | ---------------------------- |
| `id`   | `String` | **Required** id do estudante |

Response:

```json
{
    {
	"data": {
		"id": 3,
		"name": "luis",
		"email": "teste@teste.com",
		"registration": "123456",
		"birth_date": "21/12/2004",
		"created_at": "2023-08-02T19:57:23.949-03:00",
		"updated_at": "2023-08-02T19:57:23.949-03:00"
	}
}
}
```

### Alterar dados estudante:

```http
    PATCH /student/:{id}
```

| Params | Type     | Description                  |
| ------ | -------- | ---------------------------- |
| `id`   | `String` | **Required** id do estudante |

### Deletar estudante

```http
    DELETE /student/:{id}
```

| Params | Type     | Description                  |
| ------ | -------- | ---------------------------- |
| `id`   | `String` | **Required** id do estudante |

# Professor

### Two factor authentication enable

```http
    POST /twoFactorAuth
```

| Headers          | Type     | Description               |
| ---------------- | -------- | ------------------------- |
| `Authentication` | `Bearer` | **Required** bearer token |

Response:

Return a object from Liberie Speakeasy.

```json
{
    ascii:""
    base32:""
    hex:""
    otpauth_url:""
}
```

### Two factor authentication verify

```http
    POST /twoFactorAuth/verify
```

| Headers          | Type     | Description               |
| ---------------- | -------- | ------------------------- |
| `Authentication` | `Bearer` | **Required** bearer token |

| Body    | Type     | Description            |
| ------- | -------- | ---------------------- |
| `token` | `String` | **Required** Pin/token |

# Tests:

Use .env.test to dont have any problem on database.

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName-teste`

`PORT = number #recommended:4000`

To run tests:

```bash
    npm run test
```

# Run locally

Clone plroject:

```bash

  git clone https://github.com/luishsilva09/desafio-backend-clicksoft.git

```

Instal dependencies:

```bash

  npm install

```

Run on dev mode:

```bash
    npm run dev
```

# Variaveis

`PORT=3333

HOST=0.0.0.0

NODE_ENV=development

APP_KEY=blim71Fqtqo4Ze1608LpB4ggLu1gneeX

DRIVE_DISK=local

DB_CONNECTION=pg

PG_HOST=localhost

PG_PORT=5432

PG_USER=lucid

PG_PASSWORD=

PG_DB_NAME=lucid`

# Author

​

- Luís Henrique da Silva

​

https://github.com/luishsilva09

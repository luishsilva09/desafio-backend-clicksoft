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
| `registration` | `String` | **Required** matricula estudante        |
| `birthDate`    | `String` | **Required** data aniversario estudante |

</br>

### Buscar estudante:

```http
    GET /student/:{registration}
```

| Params         | Type     | Description                         |
| -------------- | -------- | ----------------------------------- |
| `registration` | `String` | **Required** matricula do estudante |

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

### Editar dados estudante:

```http
    PATCH /student/:{registration}
```

| Body        | Type     | Description                |
| ----------- | -------- | -------------------------- |
| `name`      | `String` | nome estudante             |
| `email`     | `String` | email estudante            |
| `birthDate` | `String` | data aniversario estudante |

| Params         | Type     | Description                         |
| -------------- | -------- | ----------------------------------- |
| `registration` | `String` | **Required** matricula do estudante |

### Deletar estudante

```http
    DELETE /student/:{registration}
```

Request:

| Body        | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| `email`     | `String` | **Required** email estudante            |
| `birthDate` | `String` | **Required** data aniversario estudante |

`body = Usando para confirmar identidade do usuario`

| Params         | Type     | Description                         |
| -------------- | -------- | ----------------------------------- |
| `registration` | `String` | **Required** matricula do estudante |

### Listar salas a comparecer

```http
    GET /student/listClass/:{registration}
```

| Params         | Type     | Description                         |
| -------------- | -------- | ----------------------------------- |
| `registration` | `String` | **Required** matricula do estudante |

Response:

```json
{
  {
	"data": "lista de salas",
	"nomeAluno": "luis",
	"classList": [
		{
			"Profesor": "luis",
			"Sala": "1"
		}
	]
}
}
```

# Professor

### Registro professor:

```http
    POST /professor
```

Request:

| Body           | Type     | Description                             |
| -------------- | -------- | --------------------------------------- |
| `name`         | `String` | **Required** nome professor             |
| `email`        | `String` | **Required** email professor            |
| `registration` | `String` | **Required** matricula professor        |
| `birthDate`    | `String` | **Required** data aniversario professor |

</br>

### Buscar professor:

```http
    GET /professor/:{registration}
```

| Params         | Type     | Description                         |
| -------------- | -------- | ----------------------------------- |
| `registration` | `String` | **Required** matricula do professor |

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

### Editar dados professor:

```http
    PATCH /professor/:{registration}
```

| Body        | Type     | Description                |
| ----------- | -------- | -------------------------- |
| `name`      | `String` | nome professor             |
| `email`     | `String` | email professor            |
| `birthDate` | `String` | data aniversario professor |

| Params         | Type     | Description                         |
| -------------- | -------- | ----------------------------------- |
| `registration` | `String` | **Required** matricula do professor |

### Deletar professor

```http
    DELETE /professor/:{registration}
```

Request:

| Body        | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| `email`     | `String` | **Required** email professor            |
| `birthDate` | `String` | **Required** data aniversario professor |

`body = Usando para confirmar identidade do usuario`

| Params         | Type     | Description                         |
| -------------- | -------- | ----------------------------------- |
| `registration` | `String` | **Required** matricula do professor |

# Salas

### Registro sala:

```http
    POST /classroom
```

Request:

| Body                    | Type      | Description                                   |
| ----------------------- | --------- | --------------------------------------------- |
| `professorRegistration` | `String`  | **Required** matricula do professor           |
| `roomNumber`            | `String`  | **Required** numero da sala                   |
| `studentCapacity`       | `Number`  | **Required** capacidade de estudantes na sala |
| `isAvailable`           | `Boolean` | **Required** se esta disponivel para alocar   |

</br>

### Editar dados sala:

```http
    PATCH /classroom/:{roomNumber}
```

| Body              | Type      | Description                      |
| ----------------- | --------- | -------------------------------- |
| `studentCapacity` | `Number`  | capacidade de estudantes na sala |
| `isAvailable`     | `Boolean` | se esta disponivel para alocar   |

| Params       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `roomNumber` | `String` | **Required** numero da sala |

### Deletar sala

```http
    DELETE /classroom/:{roomNumber}
```

Request:

| Body               | Type     | Description                      |
| ------------------ | -------- | -------------------------------- |
| `profRegistration` | `String` | **Required** matricula professor |

`body = Usando para confirmar identidade do usuario`

| Params       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `roomNumber` | `String` | **Required** numero da sala |

### Buscar sala:

```http
    GET /classroom/:{roomNumber}
```

| Body               | Type     | Description                      |
| ------------------ | -------- | -------------------------------- |
| `profRegistration` | `String` | **Required** matricula professor |

| Params       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `roomNumber` | `String` | **Required** numero da sala |

Response:

```json
{
    {
	"data": [
		{
			"id": 2,
			"room_number": "33",
			"student_capacity": "20",
			"is_available": true,
			"professor_id": 1,
			"created_at": "2023-08-04T21:58:55.260Z",
			"updated_at": "2023-08-04T21:58:55.260Z"
		}
	]
}
}
```

### Alocar aluno na sala

```http
    POST /classroom/addStudent/:{roomNumber}
```

| Body                  | Type     | Description                      |
| --------------------- | -------- | -------------------------------- |
| `profRegistration`    | `String` | **Required** matricula professor |
| `studentRegistration` | `String` | **Required** matricula do aluno  |

| Params       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `roomNumber` | `String` | **Required** numero da sala |

### Remover aluno da sala

```http
   POST /classroom/removeStudent/:{roomNumber}
```

| Body                  | Type     | Description                      |
| --------------------- | -------- | -------------------------------- |
| `profRegistration`    | `String` | **Required** matricula professor |
| `studentRegistration` | `String` | **Required** matricula do aluno  |

| Params       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `roomNumber` | `String` | **Required** numero da sala |

### Listar alunos na sala

```http
    POST /classroom/allStudents/:{roomNumber}
```

| Body               | Type     | Description                      |
| ------------------ | -------- | -------------------------------- |
| `profRegistration` | `String` | **Required** matricula professor |

| Params       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `roomNumber` | `String` | **Required** numero da sala |

Response:

```json
{
  "data": "Lista de alunos",
  "studentsList": [
    {
      "name": "luis",
      "registration": "1",
      "email": "luiss@teste.com"
    },
    {
      "name": "luis",
      "registration": "12",
      "email": "luis@teste.com"
    },
    {
      "name": "luis henrique",
      "registration": "123",
      "email": "luis@teste.com.br"
    }
  ]
}
```

# Tests:

Ainda em construção...

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

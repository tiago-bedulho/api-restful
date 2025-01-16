### Documentação da API

#### Endpoint: Criar Utilizador
- **URL**: `/users`
- **Método**: `POST`
- **Descrição**: Este endpoint permite criar um novo utilizador no sistema.

**Entrada (Request Body)**:
{
  "name": "Tiago",
  "email": "tiago@gmail.com"
}

**Saída (Response)**:
- **Sucesso (201 Created)**:
{
  "id": 1,
  "name": "Tiago",
  "email": "tiago@gmail.com"
}
- **Erro (400 Bad Request)**:
{
  "error": "O nome e o email são obrigatórios!"
}
- **Erro (500 Internal Server Error)**:
{
  "error": "Erro ao adicionar o utilizador!"
}


---

#### Endpoint: Obter Utilizadores
- **URL**: `/users`
- **Método**: `GET`
- **Descrição**: Retorna os detalhes dos utilizadores.

**Saída (Response)**:
- **Sucesso (200 OK)**:
{
  "id": 1,
  "name": "Tiago",
  "email": "tiago@gmail.com"
}
- **Erro (500 Internal Server Error)**:
{
  "error": "Erro ao obter os utilizadores!"
}

---

#### Endpoint: Obter Utilizador por ID
- **URL**: `/users/{id}`
- **Método**: `GET`
- **Descrição**: Retorna os detalhes de um utilizador pelo ID fornecido.

**Entrada (Parâmetros de URL)**:
- **id**: ID do utilizador a ser retornado.

**Saída (Response)**:
- **Sucesso (200 OK)**:
{
  "id": 1,
  "name": "Tiago",
  "email": "tiago@gmail.com"
}
- **Erro (404 Not Found)**:
{
  "error": "Utilizador não encontrado!"
}
- **Erro (500 Internal Server Error)**
{
  "error": "Erro ao obter o utilizador!"
}

---

#### Endpoint: Atualizar Utilizador
- **URL**: `/users/{id}`
- **Método**: `PUT`
- **Descrição**: Atualiza os dados de um utilizador que já existe.

**Entrada (Request Body e Parâmetros de URL)**:
- **id**: ID do utilizador a ser atualizado.
- **Body**:
{
  "name": "Rui",
  "email": "tiago@gmail.com"
}

**Saída (Response)**:
- **Sucesso (200 OK)**:
{
  "id": 1,
  "name": "Rui",
  "email": "tiago@gmail.com"
}
- **Erro (400 Bad Request)**:
{
  "error": "O nome e o email são obrigatórios!"
}
- **Erro (404 Not Found)**:
{
  "error": "Utilizador não encontrado"
}
- **Erro (500 Internal Server Error)**:
{
  "error": "Erro ao atualizar o utilizador!"
}


---

#### Endpoint: Eliminar o Utilizador
- **URL**: `/users/{id}`
- **Método**: `DELETE`
- **Descrição**: Remove um utilizador do sistema.

**Entrada (Parâmetros de URL)**:
- **id**: ID do utilizador a ser removido.

**Saída (Response)**:
- **Sucesso (204 No Content)**:
  {
    "message": "Utilizador removido com sucesso!"
  }
- **Erro (404 Not Found)**:
{
  "error": "Usuário não encontrado"
}
- **Erro (500 Internal Server Error)**:
{
  "error": "Erro ao remover o utilizador!"
}

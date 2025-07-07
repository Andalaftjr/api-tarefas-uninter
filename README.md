# API de Gerenciamento de Tarefas - UNINTER

Este projeto é uma API RESTful desenvolvida em Java com Spring Boot para a disciplina **Desenvolvimento Web Back-End** da UNINTER.

## 👨‍💻 Aluno
**Nome:** Leandro Andalaft dos Santos Junior  
**RU:** 4548358

## ✅ Funcionalidades

A API permite:

- Criar uma nova tarefa
- Listar todas as tarefas
- Buscar tarefa por ID
- Atualizar tarefa existente
- Remover tarefa

## 🧱 Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- MySQL
- Postman
- Maven

## ⚙️ Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/api-tarefas-uninter.git
cd api-tarefas-uninter
```

### 2. Configure o banco de dados MySQL

Crie um banco de dados:

```sql
CREATE DATABASE uninter_tarefas_db;
```

Credenciais utilizadas no `application.properties`:

- Usuário: root
- Senha: admin

### 3. Compile e execute a aplicação

```bash
./mvnw spring-boot:run
```

A aplicação rodará em `http://localhost:8080/tarefas`.

## 🔄 Endpoints

| Método | URL                  | Descrição                  |
|--------|----------------------|----------------------------|
| POST   | `/tarefas`           | Criar nova tarefa          |
| GET    | `/tarefas`           | Listar todas as tarefas    |
| GET    | `/tarefas/{id}`      | Buscar tarefa por ID       |
| PUT    | `/tarefas/{id}`      | Atualizar tarefa existente |
| DELETE | `/tarefas/{id}`      | Remover tarefa existente   |

## 📬 Exemplo de Tarefa para Teste

```json
{
  "nome": "Desenvolvimento da API",
  "dataEntrega": "2025-12-12",
  "responsavel": "Leandro - RU 4548358"
}
```

## 📸 Testes

Use o Postman para testar cada operação e capturar os prints exigidos pela atividade prática.

## 📁 Estrutura do Projeto

```
src
 └── main
     ├── java
     │    └── br/com/uninter/apitaredas
     │         ├── controller
     │         ├── model
     │         └── repository
     └── resources
          └── application.properties
```

## 📝 Licença

Projeto acadêmico - UNINTER 2025

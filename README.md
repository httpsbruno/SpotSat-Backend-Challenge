# SpotSat-Backend-Challenge

Desafio de Backend proposto pela SpotSat, garenciamento de locais e áreas.

### Como compilar?
- comando `yarn install`
- criar um arquivo  `.env`
>  PORT=8080
>  USER=""
>  HOST=""
>  DATABASE=""
>  PASSWORD=""
>  DBPORT=0000
>  JWT_KEY=""
- o projeto foi configurado para utilizar  `prettier` e `eslint`

# Estrutura de Pastas

|      Pasta  | Descrição                  |
|----------------|-------------------------|
|config  | classe que organiza a chamada de variáveis do .ENV           |
|controller | classes responsáveis por organizar a chamada dos códigos           |
|errors|	arquivos com códigos de erro padrão do projetos            |
|middleware| códigos para verificação e autenticação            |
|models| Interfaces para tipagem            |
|responses| estrutura padrão de response          |
|routes | rotas da aplicação           |
|service| códigos com a lógica da API           |
|utils| arquivos que podem ser usados em muitas partes da API           |
|validators| códigos para validação de dados            |

# Login

- Na rota `http://localhost:8080/login`, enviar username e password do admin:
```
	{ 
		"username" : "Bruno",
		"password" : "1234"
	}
 ```
- resposta esperada: 
```
{
	"data": {
		"login": "sucesfull",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiQnJ1bm8iLCJpYXQiOjE2ODExNDM5MzYsImV4cCI6MTY4MTIzMDMzNn0.BDjWYCLBugxymwYlzftNdt9D5I9t2rPsDksqtXdT-nw"
	},
	"messages": []
}
 ```
 
## Teste de autenticação

- Rota `http://localhost:8080/location-test`, caso tenha permissão:
 ```
{
	"data": {
			"checkCookie": {
				"payload": "Bruno",
				"iat": 1681152966,
				"exp": 1681239366
			}
	},
	"messages": []
}
 ```

- Rota `http://localhost:8080/location-test`, caso NÃO tenha permissão:
 ```
{
		"data": {},
		"messages": ["an error occurred while token verification"]
}
 ```


### Em desenvolvimento...


# SpotSat-Backend-Challenge

Desafio de Backend proposto pela SpotSat, garenciamento de locais e áreas.

### Como compilar?

- comando `yarn install`
- criar um arquivo `.env`
  > PORT=8080
  > USER=""
  > HOST=""
  > DATABASE=""
  > PASSWORD=""
  > DBPORT=0000
  > JWT_KEY=""
- o projeto foi configurado para utilizar `prettier` e `eslint`
- comando `yarn start:dev`

# Estrutura de Pastas

| Pasta       | Descrição                                                |
| ----------- | -------------------------------------------------------- |
| config      | classe que organiza a chamada de variáveis do .ENV       |
| controller  | classes responsáveis por organizar a chamada dos códigos |
| errors      | arquivos com códigos de erro padrão do projetos          |
| middleware  | códigos para verificação e autenticação                  |
| models      | Interfaces para tipagem                                  |
| respository | conexão com Banco de Dados                               |
| responses   | estrutura padrão de response                             |
| routes      | rotas da aplicação                                       |
| service     | códigos com a lógica da API                              |
| utils       | arquivos que podem ser usados em muitas partes da API    |
| validators  | códigos para validação de dados                          |

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
		"login": "successful",
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

# 📁 Collection: Location

CRUD do tipo Point

## End-point: Insert Location

### Method: POST

> ```
> http://localhost:8080/location
> ```

### Body (**raw**)

```json
{
  "name": "Ponto 44",
  "geometry": {
    "coordinates": [-46.44921906466416, -23.48591223480146],
    "type": "Point"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Location

### Method: PUT

> ```
> http://localhost:8080/location/3a7f5b5e-615b-428b-a7ea-c461f78e793a
> ```

### Body (**raw**)

```json
{
  "name": "Ponto 4",
  "geometry": {
    "coordinates": [-46.40869995169058, -23.514554291455283],
    "type": "Point"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: All Locations

### Method: GET

> ```
> http://localhost:8080/location
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Location By Id

### Method: GET

> ```
> http://localhost:8080/location/3a7f5b5e-615b-428b-a7ea-c461f78e793a
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Location

### Method: DELETE

> ```
> http://localhost:8080/location/08414d24-d702-425f-863a-9ddda42af989
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Area

CRUD do tipo Polygon

## End-point: Insert Area

### Method: POST

> ```
> http://localhost:8080/area
> ```

### Body (**raw**)

```json
{
  "name": "Area 4",
  "geometry": {
    "coordinates": [
      [
        [-46.40991818680547, -23.512804268770637],
        [-46.40893279328802, -23.513030162881975],
        [-46.40935510479562, -23.51232827633875],
        [-46.40991818680547, -23.512804268770637]
      ]
    ],
    "type": "Polygon"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: All Areas

### Method: GET

> ```
> http://localhost:8080/area
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Area By Id

### Method: GET

> ```
> http://localhost:8080/area/fbd028d9-9a81-4e0d-940e-985d1c9be450
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Area

### Method: DELETE

> ```
> http://localhost:8080/area/cce2cec5-0ab3-4cc0-9720-e149a7167f2d
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Area

### Method: PUT

> ```
> http://localhost:8080/area/dd19f1a1-1c4b-498a-b1a6-35d30ad37218
> ```

### Body (**raw**)

```json
{
  "name": "Area 2",
  "geometry": {
    "coordinates": [
      [
        [-46.40929783640448, -23.513977293096204],
        [-46.40929783640448, -23.515337422087057],
        [-46.40827188336476, -23.515337422087057],
        [-46.40827188336476, -23.513977293096204],
        [-46.40929783640448, -23.513977293096204]
      ]
    ],
    "type": "Polygon"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Operations

Buscas no Banco de dados, de acordo com os lugares e áreas registrados.

## End-point: Distance Between

### Method: GET

> ```
> http://localhost:8080/places/:id1/distanceto/:id2
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Location in Area

### Method: GET

> ```
> http://localhost:8080/places/:locationName/:areaName
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Locations in Area

### Method: GET

> ```
> http://localhost:8080/places/:areaName
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Areas Inside Circle

### Method: GET

> ```
> http://localhost:8080/circle-areas/?latitude=-46.44921906466416&longitude=-23.48591223480146&raio=0.05
> ```

### Query Params

| Param     | value              |
| --------- | ------------------ |
| latitude  | -46.44921906466416 |
| longitude | -23.48591223480146 |
| raio      | 0.05               |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Locations Inside Circle

### Method: GET

> ```
> http://localhost:8080/circle-locations/?latitude=-46.44921906466416&longitude=-23.48591223480146&raio=0.05
> ```

### Query Params

| Param     | value              |
| --------- | ------------------ |
| latitude  | -46.44921906466416 |
| longitude | -23.48591223480146 |
| raio      | 0.05               |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

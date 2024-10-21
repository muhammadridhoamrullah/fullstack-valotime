# Valotime API Documentation

# Deployed server

- url :
- registered user :

```js
{
    email: "ridhoamrullah@gmail.com",
    password: "1234567890",
    username: "ridhoamrullah",
    fullName: "Muhammad Ridho Amrullah"
  },
  {
    email: "user1@mail.com",
    password: "user1",
    username: "user1",
    fullName: "User One"
  },
  {
    email: "user2@mail.com",
    password: "user2",
    username: "user2",
    fullName: "User Two"
  }
```

## Models :

_User_

```
- email: string, required, isEmail, unique
- password: string, required
- username: string, required, unique
- fullName: string, required
```

_Post_

```
- imgUrl: string, required
- title: string, required
- caption: string, required
- tag: string, required
- UserId: integer, required
```

_Tag_

```
- nameTag: string, required
```

\__PostTag_

```
- PostId: integer, required
- TagId: integer, required
```

## Relationship :

> ### **Many-to-Many**

## Endpoints :

router.post("/register", Controller.register);
list of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`

Routes below need authentication:

- `GET /agents`
- `GET /agents/:uuid`

- `GET /maps`

- `GET /weapons`

- `GET /gameModes`

- `GET /rank`

- `GET /openAI`

- `POST /generate-midtrans-token`

- `POST /posting`

- `GET /beranda`

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "fullName": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Full Name is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "<token>"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /login-google

## 4. GET /agents

Description:

- Fetch all agents from 3rd party apis database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "uuid": "e370fa57-4757-3604-3648-499e1f642d3f",
    "displayName": "Gekko",
    "description": "Gekko the Angeleno leads a tight-knit crew of calamitous creatures. His buddies bound forward, scattering enemies out of the way, with Gekko chasing them down to regroup and go again.",
    "fullPortraitV2": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
  },
  {
    "uuid": "dade69b4-4f5a-8528-247b-219e5a1facd6",
    "displayName": "Fade",
    "description": "Turkish bounty hunter Fade unleashes the power of raw nightmare to seize enemy secrets. Attuned with terror itself, she hunts down targets and reveals their deepest fears - before crushing them in the dark.",
    "fullPortraitV2": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/fullportrait.png",
  },
  ...,
]
```

## 5. GET /agents/:uuid

Description:

- Fetch detail agents by uuid

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "uuid": "string"
}
```

_Response (200 - OK)_

```json
{
  "uuid": "e370fa57-4757-3604-3648-499e1f642d3f",
  "displayName": "Gekko",
  "description": "Gekko the Angeleno leads a tight-knit crew of calamitous creatures. His buddies bound forward, scattering enemies out of the way, with Gekko chasing them down to regroup and go again.",
  "fullPortraitV2": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 6. GET /maps

Description:

- Fetch all maps from 3rd party apis database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "uuid": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
    "displayName": "Ascent",
    "coordinates": "45°26'BF'N,12°20'Q'E",
  },
  {
    "uuid": "d960549e-485c-e861-8d71-aa9d1aed12a2",
    "displayName": "Split",
    "coordinates": "35°41'CD'N,139°41'WX'E",
  },
  ...,
]
```

## 7. GET /weapons

Description:

- Fetch all weapons from 3rd party apis database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "uuid": "asasbe3b-4337-bbf6-6ab9-04b8f06b3319",
    "displayName": "Odin",
  },
  {
    "uuid": "wewv355-485c-e861-8d71-aa9d1aed12a2",
    "displayName": "Vandal",
  },
  ...,
]
```

## 8. GET /gameModes

## 9. GET /rank

## 10. GET /openAI

Description:

- Ask OpenAI about what the best way to win in valorant by select option of maps.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
  "map": "",
  "agentKomposisi": "",
  "alasan": "",
  "persentaseUntukMenang": "",
  "alasanPersentaseSegitu": ""
}
```

## 11. POST /generate-midtrans-token

## 12. POST /posting

Description:

- Add a post to beranda.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "imgUrl": "https://i.pinimg.com/originals/74/45/82/744582341c579a459b4bd319e7bc1915.jpg",
  "title": "Reyna's funny face",
  "caption": "Reyna dark system",
  "tag": "Duelist"
}
```

## 13. GET /beranda

Description:

- Fetch all posting database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "1",
    "imgUrl": "https://i.imgur.com/a2dgxQg.jpeg",
    "title": "Nerf Viper pls",
    "caption": "Viper dark system",
    "tag": "Sentine;"
  },
  ...,
]
```

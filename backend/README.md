# API Documentation

> All authenticated routes require the following header:

```
Authorization: Bearer <token>
```

Invalid or missing tokens:
**Responses**
- `403 Forbidden`
```json
{
  "error": "invalid token"
}
```

---

## Auth Routes

### POST `/api/v1/user/signup`

**Description**  
Registers a new user and returns a JWT token.

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Responses**
- `200 OK`
```json
{
  "message": "User created successfully",
  "token": "jwt_token_string"
}
```

- `409 Conflict`
```json
{ "error": "Username already taken" }
```

- `411 Length Required`
```json
{ "error": "incorrect data" }
```

- `500 Internal Server Error`
```json
{ "error": "server error message" }
```

---

### POST `/api/v1/user/signin`

**Description**  
Logs in an existing user and returns a JWT token.

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Responses**
- `200 OK`
```json
{
  "message": "User logged in",
  "token": "jwt_token_string"
}
```

- `400 Bad Request`
```json
{ "error": "incorrect data" }
```

- `401 Unauthorized`
```json
{ "error": "username or password incorrect" }
```
- `500 Internal Server Error`
```json
{ "error": "server error message" }
```

---

## Content Routes

> The `content` object may be of one of the following kinds:
> - `note`
> - `stream`
> - `network`
> - `todos`

Each is distinguished by its `kind` field.

---

### GET `/api/v1/content/`

**Query Parameters**
- `kind?: string`
- `page?: string`
- `limit?: string`
- `sort?: string`

**Response**
- `200 OK`
```json
[ array of content ]
```

---

### POST `/api/v1/content/`

**Description**  
Creates a new content item (of any kind).

**Request Body**
```ts
// content object (note, stream, network, or todos)
```

**Responses**
- `200 OK`
```json
{ content }
```

- `400 Bad Request`
```json
{ "error": "invalid data" }
```

- `404 Not Found`
```json
{ "error": "one or more nodes not found" }
```

---

### GET `/api/v1/content/:id`

**Response**
- `200 OK`
```json
{ content }
```

- `404 Not Found`
```json
{ "error": "not found" }
```

---

### PATCH `/api/v1/content/:id`

**Request Body**
```ts
// partial content object (same as POST)
```

**Responses**
- `200 OK`
```json
{ content }
```

- `404 Not Found`
```json
{ "error": "invalid id" }
```

- `411 Length Required`
```json
{ "error": "invalid data" }
```

---

### DELETE `/api/v1/content/:id`

**Responses**
- `200 OK`
```json
{ "message": "deleted successfully" }
```

- `404 Not Found` or `411 Length Required`
```json
{ "error": "invalid id" }
```

---

## Share Route

### GET `/api/v1/share/:id`

**Responses**
- `200 OK`
```json
{ content }
```

- `404 Not Found`
```json
{ "error": "Not found" }
```
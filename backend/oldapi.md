## POST /api/v1/user/signup

Description
Logs in an existing user and returns a JWT token.


Request Body
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
200 {
  "message":"User created Successfully",
  "token": "jwt_token_string",
  }
status(411).json({"error":"incorrect data"});
status(409).json({ error: "Username already taken" });
res.status(500).json({error: err.message});

## POST /api/v1/user/signin

Description
Logs in an existing user and returns a JWT token.


Request Body
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
200 {
  "message":"User logged in",
  "token": "jwt_token_string",
  }
status(411).json({"error":"incorrect data"});
status(411).json({"error": "username or password incorrect"})
res.status(500).json({error: err.message});




all these routes are authenticated, need header Authorization : "bearer token"
status(403).json({"error":"invalid token"})
tatus(411).json({"error": "username doesn't exist"})
res.status(500).json({error: err.message});

## GET /api/v1/content/
query params: { kind? : string, page? : string, limit? : string, sort? : string}
status(200).json(array of contents);


## POST /api/v1/content/
body is the content model



status(400).json({ error: "invalid data"});
                        res.status(404).json({"error": "one or more nodes not found"});
.status(200).json(content);

## GET /api/v1/content/:id
status(404).json({error: "not found"});
status(200).json(content);

## PATCH /api/v1/content/:id
body is the same content model

status(411).json({error: "invalid data"});
status(404).json({error: "invalid id"});
status(201).json(content);

## DELETE /api/v1/content/:id
status(404).json({error: "invalid id"});
tatus(411).json({error:"invalid id"});
status(201).json({message: "deleted successfully"});

## GET /api/v1/share/:id
status(404).json({ error: "Not found" });
tatus(201).json(content);
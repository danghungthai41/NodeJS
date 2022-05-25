const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// HTTPS METHOD: GET, POST, PUT, DELETE, PATCH
//ResfulAPI
/*
- Method: GET
- Route: /api/v1/users

-- Method: GET
- ROUTE: /API/V1/USERS:ID

- Method: POST
- ROUTE: /API/V1/USERS

- METHOD: PUT
- ROUTE: /API/V1/USERS/:ID 

- METHOD: DELETE
- ROUTE: /API/V1/USERS/:ID

---STATUS CODE---
200:SUCESS, 201: POST SUCESS
400:
500:

*/
const users = [
  { id: 1, name: "Thai Dang", email: "thaidang@gmail.com" },
  { id: 2, name: "Ronaldo", email: "ronaldo@gmail.com" },
];

// GET ALL
app.get("/api/v1/users", (_, res) => {
  res.send(users);
});

//GET BY ID
app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => Number(id) === item.id);
  if (!user) {
    return res.status(400).send("User Not Found");
  }
  res.status(200).send(user);
});

// CREATE POST
app.post("/api/v1/users", (req, res) => {
  const { name, email } = req.body;
  const user = { id: Math.floor(Math.random() * 100), name, email };

  users.push(user);
  res.status(201).send(user);
});

//PUT: update
app.put("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let index = users.findIndex((item) => Number(id) === item.id);

  if (index === -1) {
    res.status(400).send("Use Not Found");
  }
  const user = { id: Number(id), name, email };

  users[index] = user;
  res.status(200).send(user);
});

//PATCH: update / field
app.patch("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let index = users.findIndex((item) => Number(id) === item.id);

  if (index === -1) {
    res.status(400).send("Use Not Found");
  }
  if (name) {
    users[index].name = name;
  }
  if (email) {
    users[index].email = email;
  }
  res.status(200).send(users[index]);
});

//Delete:

app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  let index = users.findIndex((item) => Number(id) === item.id);

  if (index === -1) {
    res.status(400).send("Use Not Found");
  }
  users.splice(index, 1);
  res.status(200).send("Xóa Thành Công");
});

app.listen("8080", () => {});

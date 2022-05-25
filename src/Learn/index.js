const express = require("express");
const mysql = require("mysql2/promise");

let connection;

const app = express();
app.use(express.json());

mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    port: "3307",
    database: "express",
  })
  .then((connect) => {
    connection = connect;
  })
  .catch((err) => {
    throw err;
  });

app.get("/api/v1/users", async (req, res) => {
  const sql = "SELECT * FROM users";
  try {
    const [result] = await connection.query(sql);
    res.status(200).send({ data: result });
  } catch (err) {
    throw err;
  }
});

app.get("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  //Cách 1:
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  //Cách 2:
  //   const sql = `SELECT * FROM users WHERE id = ? AND age  > ?` ;
  //     const [result] = await connection.query(sql, [id, 18]);

  try {
    const [result] = await connection.query(sql);
    const user = result?.[0];
    if (!user) {
      res.status(400).send("User Not Found");
    }
    res.status(200).send({ data: user });
  } catch (error) {
    throw error;
  }
});

app.post("/api/v1/users", async (req, res) => {
  const { name, email } = req.body;
  const sql = `
    INSERT INTO users SET ?
  `;
  try {
    const result = await connection.query(sql, { name, email });
    const userId = result.insertId;
    res.status(201).send({ data: userId, message: "Thêm Thành Công" });
  } catch (error) {
    throw err;
  }
});

app.put("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql1 = `UPDATE users SET ? WHERE id = ?`;
  try {
    const [result] = await connection.query(sql1, [{ name, email }, id]);
    if (!result.affectedRows) {
      res.status(400).send("User Not Found");
    }
    const sql2 = `SELECT * FROM users WHERE id = ?`;
    const [result2] = await connection.query(sql2, [id]);
    const user = result2;
    res.status(200).send({ data: user, message: "Thành Công" });
  } catch (err) {
    throw err;
  }
});

//Delete:

app.delete("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;

  const sql = `DELETE  FROM users WHERE id = ?`;
  try {
    const [result] = await connection.query(sql, [id]);
    if (!result.affectedRows) {
      res.status(400).send("User Not Found");
    }
    res.status(200).send({ message: "Xóa Thành Công" });
  } catch (error) {
    throw error;
  }
});
app.listen("8080", () => {});

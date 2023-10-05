const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ramo0404",
  database: "crud_app",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/add", (req, res) => {
  const title = req.body.title;
  const titleDescription = req.body.titleDescription;
  const sql = "INSERT INTO notes (title, title_description) VALUES (?, ?)";
  db.query(sql, [title, titleDescription], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

app.get("/api/get", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/deleteData", (req, res) => {
  console.log(req.body);
  const { ids } = req.body;
  const query = `DELETE FROM notes WHERE id IN (${ids.join(",")})`;
  db.query(query, (error, results) => {
    console.log(error, results);
  });
  res.status(200);
  res.send();
});

app.listen(3001, () => {
  console.log("listening on 3001");
});

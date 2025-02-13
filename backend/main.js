const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "https://dev-to-rater.xyz",
  methods: "GET, PUT",
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "devtorater",
});

db.connect((err) => {
  if (err) {
    console.error("Error occured while connecting to the database:", err);
    return;
  }
});

app.get("/count", (req, res) => {
  db.query("SELECT count FROM posts LIMIT 1", (err, results) => {
    if (err) {
      console.error("Error occured while querying:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json({ count: results[0]?.count || 0 });
  });
});

app.put("/increment", (req, res) => {
  db.query("UPDATE posts SET count = count + 1", (err, results) => {
    if (err) {
      console.error("Error occured:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json({ message: "Count increased by 1" });
  });
});

app.listen(port, () => {
  console.log(`Server works on http://localhost:${port}`);
});

module.exports = app;

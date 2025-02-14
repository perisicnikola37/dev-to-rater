const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error occurred while connecting to the database:", err);
    return;
  }

  console.log("Connected to MySQL server.");

  db.query("CREATE DATABASE IF NOT EXISTS devtorater", (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log("Database 'devtorater' created or already exists.");

    db.query(
      `CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        count INT DEFAULT 0
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err);
          return;
        }
        console.log("Table 'posts' created or already exists.");

        db.query("SELECT * FROM posts WHERE id = 1", (err, results) => {
          if (err) {
            console.error("Error checking for initial row:", err);
            return;
          }

          if (results.length === 0) {
            db.query("INSERT INTO posts (count) VALUES (0)", (err) => {
              if (err) {
                console.error("Error inserting initial row:", err);
                return;
              }
              console.log("Initial row inserted.");
            });
          } else {
            console.log("Initial row already exists.");
          }
        });
      }
    );
  });
});

module.exports = db;

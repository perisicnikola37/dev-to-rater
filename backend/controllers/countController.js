const db = require("../database/database");

exports.getCount = (req, res) => {
  db.query("SELECT count FROM posts LIMIT 1", (err, results) => {
    if (err) {
      console.error("Error occured while querying:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json({ count: results[0]?.count || 0 });
  });
};

exports.incrementCount = (req, res) => {
  db.query("UPDATE posts SET count = count + 1", (err, results) => {
    if (err) {
      console.error("Error occured:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json({ message: "Count increased by 1" });
  });
};

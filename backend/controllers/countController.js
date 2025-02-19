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
  const changeValue = req.body.changeValue;

  if (changeValue === undefined || changeValue <= 0) {
    return res.status(400).json({ error: "Invalid increment value" });
  }

  db.query("UPDATE posts SET count = count + ?", [changeValue], (err) => {
    if (err) {
      console.error("Error occurred:", err);
      return res.status(500).json({ error: "Server error" });
    }

    db.query("SELECT count FROM posts LIMIT 1", (err, result) => {
      if (err) {
        console.error("Error occurred while fetching count:", err);
        return res.status(500).json({ error: "Server error" });
      }

      const currentCount = result?.[0]?.count;

      if (currentCount !== undefined) {
        res.json({
          message: `Count increased by ${changeValue}`,
          count: currentCount,
        });
      } else {
        res.status(500).json({ error: "Count not found" });
      }
    });
  });
};

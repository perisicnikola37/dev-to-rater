const db = require("../database/database");

exports.getFeaturedPosts = (req, res) => {
  db.query(
    "SELECT * FROM featured_posts ORDER BY id DESC LIMIT 7",
    (err, results) => {
      if (err) {
        console.error("Error occurred while querying:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.json({ results });
    }
  );
};

exports.addFeaturedPost = (req, res) => {
  const { post_title, post_thumbnail, post_url } = req.body;
  if (!post_title || !post_url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  const checkQuery = "SELECT * FROM featured_posts WHERE post_url = ?";
  db.query(checkQuery, [post_url], (err, results) => {
    if (err) {
      console.error("Error occurred while querying:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "Post already exists" });
    }

    const insertQuery =
      "INSERT INTO featured_posts (post_title, post_thumbnail, post_url) VALUES (?, ?, ?)";
    db.query(
      insertQuery,
      [post_title, post_thumbnail, post_url],
      (err, results) => {
        if (err) {
          console.error("Error occurred while inserting:", err);
          return res.status(500).json({ error: "Server error" });
        }
        res.status(201).json({
          message: "Featured post added successfully",
          postId: results.insertId,
        });
      }
    );
  });
};

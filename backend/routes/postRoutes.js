const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/posts", postController.addFeaturedPost);
router.get("/posts/featured", postController.getFeaturedPosts);

module.exports = router;

const express = require("express");
const router = express.Router();
const countController = require("../controllers/countController");

router.get("/count", countController.getCount);
router.put("/increment", countController.incrementCount);

module.exports = router;

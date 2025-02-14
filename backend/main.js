const { CORS_ORIGIN, CORS_OPTIONS } = require("./configuration/webConstants");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(CORS_OPTIONS));
app.use(express.json());

const countRoutes = require("./routes/countRoutes");
const postRoutes = require("./routes/postRoutes");
app.use("/api", countRoutes, postRoutes);

app.get("/", (req, res) => {
  res.send("Dev.to Rater");
});

app.listen(port, () => {
  console.log(`Server works on http://localhost:${port}`);
});

module.exports = app;

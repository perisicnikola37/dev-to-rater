const { CORS_ORIGIN, CORS_OPTIONS } = require("./configuration/webConstants");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(CORS_OPTIONS));

const countRoutes = require("./routes/countRoutes");
app.use("/api", countRoutes);

app.get("/", (req, res) => {
  res.send("Dev.to Rater");
});

app.listen(port, () => {
  console.log(`Server works on http://localhost:${port}`);
});

module.exports = app;

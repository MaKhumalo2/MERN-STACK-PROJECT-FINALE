const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express.js!");
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
module.exports = app;

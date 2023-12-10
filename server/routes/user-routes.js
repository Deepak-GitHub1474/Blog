const express = require("express");
const route = express.Router();

// Home page route
route.get("/", (req, res) => {
  res.status(200).send({ msg: "Home Page" });
});

module.exports = route;



const express = require("express");
const route = express.Router();
const quizSchema = require("../schemas/quizSchema");

route.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.json("Server is running");
});

route.post("/", (req, res) => {
  res.json(req.body)
});
module.exports = route;

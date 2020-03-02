const express = require("express");
const route = express.Router();
const quizSchema = require("../models/quizSchema");

route.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.json("Server is running");
});

route.post("/", async (req, res) => {
  const { body } = req;
  const Quiz = new quizSchema(req.body);

  let titleExist = await quizSchema.findOne({ title: body.title });
  if (titleExist) return res.json("This title alredy exist");
  try {
    const savedQuiz = await Quiz.save(body);
    res.json(savedQuiz);
  } catch (err) {
    console.log("Got error while saving on server", err);
  }
});
module.exports = route;

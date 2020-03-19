const express = require("express");
const route = express.Router();
const quizSchema = require("../models/quizSchema");
const userSchema = require("../models/userSchema");

route.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.json("Private route access");
});

route.post("/", async (req, res) => {
  const { body, user } = req;
  const currentUser = await userSchema.findOne({ _id: user._id });
  const Quiz = new quizSchema({ ...req.body, user: currentUser.email });
  const titleExist = await quizSchema.findOne({ title: body.title });
  if (titleExist) return res.json("This title alredy exist");
  try {
    const savedQuiz = await Quiz.save({ ...body });
    res.json(savedQuiz);
  } catch (err) {
    console.log("Got error while saving on server", err);
  }
});
module.exports = route;

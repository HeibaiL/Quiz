const route = require("express").Router();
const quizSchema = require("../schemas/quizSchema");

route.get("/", async (req, res) => {
    const quizes = await quizSchema.find();
    res.json(quizes)
});
module.exports = route;

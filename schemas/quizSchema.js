const mongoose = require("mongoose");
//TODO: JOI VALIDATION
const Joi = require("@hapi/joi");

const quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  data: {
    required: true,
    type: Array
  }
});

module.exports = mongoose.model("quiz", quizSchema);

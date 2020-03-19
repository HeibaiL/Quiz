const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  data: {
    required: true,
    type: Array
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  usersAnswered: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("quiz", quizSchema);

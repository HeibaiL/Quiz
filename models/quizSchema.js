const mongoose = require("mongoose");

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

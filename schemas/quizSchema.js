const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
data:{
  required:true,
  type:Array,
  question: {
    type: String,
    required: true
  },
}
});

module.exports = mongoose.model("quizSchema", quizSchema);
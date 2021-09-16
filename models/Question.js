const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide a question"],
    maxLength: [256, "It can be no longet than 256 characters"],
  },
  type: {
    type: String,
    enum: ["multiple_choice", "true_or_false", "input"],
    default: "multiple_choice",
  },
  answers: {
    type: [String, Boolean, [String]],
    required: [true, "Please provide an answer for the question"],
  },
  imageUrl: {
    type: String,
    default: undefined,
  },
});

export default QuestionSchema;

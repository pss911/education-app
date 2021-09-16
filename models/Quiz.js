const mongoose = require("mongoose");
const Question = require("./Question");

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the quiz."],
      maxLength: [
        25,
        "Name of the quiz can't have be more than 25 characters.",
      ],
    },
    description: {
      type: String,
      maxLength: [
        512,
        "The description of the quiz cannot be any longer than 512 characters.",
      ],
    },
    imageUrl: {
      type: String,
      default: undefined,
    },
    questions: [Question],
    likes: Number,
    dislikes: Number,
  },
  { collection: "Quizzes" }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;

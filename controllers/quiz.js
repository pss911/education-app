const ErrorResponse = require("../utils/errorResponse");
const Quiz = require("../models/Quiz");

exports.create = async (req, res, next) => {
  const { name, description, type, imageUrl, imageId, questions } = req.body;

  if (!name)
    return next(new ErrorResponse("Please provide a name for the quiz", 400));
  if (!description)
    return next(
      new ErrorResponse("Please provide a description for the quiz", 400)
    );
  if (!questions || !questions[0])
    return next(
      new ErrorResponse("Please provide valid questions for the quiz", 400)
    );

  if (imageUrl && !imageId)
    return next(new ErrorResponse("Please provide an id for the image.", 400));

  for (let q of questions) {
    let { question, answers, imageUrl, imageId } = q;
    const questionNumber = questions.indexOf(q) + 1;

    if (!question)
      return next(
        new ErrorResponse(
          `Please provide a proper question for Question #${questionNumber}`,
          400
        )
      );

    if (!answers || answers.length == 0)
      return next(
        new ErrorResponse(
          `Please provide proper answers for Question ${questionNumber}`
        )
      );

    if (imageUrl && !imageId)
      return next(
        new ErrorResponse("Please provide an id for the image.", 400)
      );

    const quiz = new Quiz({ name, description, type, imageUrl, questions });

    quiz.save();

    res.status(200).json({ success: true, data: "Quiz Created" });
  }
};

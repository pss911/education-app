import React, { useEffect } from "react";
import "./styles.css";

function TrueOrFalseAnswerEditor({
  trueOrFalse,
  setTrueOrFalse,
  setQuestions,
  currentQuestionNumber,
  questions,
}) {
  useEffect(() => {
    if (questions)
      if (questions[0]) {
        setQuestions((arr) => {
          arr[currentQuestionNumber].true_or_false = trueOrFalse;
          return arr;
        });
      }
  }, [trueOrFalse]);

  useEffect(() => {
    if (questions)
      if (questions[0]) {
        setTrueOrFalse(questions[currentQuestionNumber].true_or_false);
      }
  }, [currentQuestionNumber, questions]);

  return (
    <div className="QuizQuestionEditor__answersBox">
      <div className="true">
        <input
          className="true_or_false"
          type="radio"
          id="true"
          value="true"
          name="true_or_false"
          onChange={(e) => setTrueOrFalse(e.target.value)}
          checked={trueOrFalse === "true" ? true : false}
        />
        True
      </div>
      <div className="false">
        <input
          className="true_or_false"
          type="radio"
          id="false"
          value="false"
          name="true_or_false"
          onChange={(e) => setTrueOrFalse(e.target.value)}
          checked={trueOrFalse === "false" ? true : false}
        />
        False
      </div>
    </div>
  );
}

export default TrueOrFalseAnswerEditor;

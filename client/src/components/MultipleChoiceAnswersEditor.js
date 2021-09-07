import React from "react";
import "./styles.css";

function MultipleChoiceAnswersEditor({
  answers,
  setAnswers,
  correct,
  setCorrect,
}) {
  return (
    <div className="QuizQuestionEditor__answersBox">
      <div className="answer a1">
        <input
          type="checkbox"
          id="answer1"
          checked={correct.answer1}
          onChange={(e) =>
            setCorrect({ ...correct, answer1: e.target.checked })
          }
        />
        <input
          type="text"
          maxLength="30"
          className="answer-input"
          placeholder="Enter An Answer Here"
          value={answers.answer1}
          onChange={(e) => setAnswers({ ...answers, answer1: e.target.value })}
        />
      </div>
      <div className="answer a2">
        <input
          type="checkbox"
          id="answer2"
          checked={correct.answer2}
          onChange={(e) =>
            setCorrect({ ...correct, answer2: e.target.checked })
          }
        />
        <input
          type="text"
          maxLength="30"
          className="answer-input"
          placeholder="Enter An Answer Here"
          value={answers.answer2}
          onChange={(e) => setAnswers({ ...answers, answer2: e.target.value })}
        />
      </div>
      <div className="answer a3">
        <input
          type="checkbox"
          id="answer3"
          checked={correct.answer3}
          onChange={(e) =>
            setCorrect({ ...correct, answer3: e.target.checked })
          }
        />
        <input
          type="text"
          maxLength="30"
          className="answer-input"
          placeholder="Enter An Answer Here"
          value={answers.answer3}
          onChange={(e) => setAnswers({ ...answers, answer3: e.target.value })}
        />
      </div>
      <div className="answer a4">
        <input
          type="checkbox"
          id="answer4"
          checked={correct.answer4}
          onChange={(e) =>
            setCorrect({ ...correct, answer4: e.target.checked })
          }
        />
        <input
          type="text"
          maxLength="30"
          className="answer-input"
          placeholder="Enter An Answer Here"
          value={answers.answer4}
          onChange={(e) => setAnswers({ ...answers, answer4: e.target.value })}
        />
      </div>
    </div>
  );
}

export default MultipleChoiceAnswersEditor;

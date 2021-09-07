import React from "react";
import "./styles.css";

function TrueOrFalseAnswerEditor({ setTrueOrFalse }) {
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
        />
        False
      </div>
    </div>
  );
}

export default TrueOrFalseAnswerEditor;

import React from "react";
import { CustomTextField } from "./";

function InputAnswerQuestionEditor({ answer, setAnswer }) {
  return (
    <div className="QuizQuestionEditor__answersBox">
      <h3 className="input_answer_title">Answer:</h3>
      <CustomTextField
        type="text"
        label="Answer"
        variant="outlined"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        size="small"
        required
        fullWidth
        className="answer_input"
      />
    </div>
  );
}

export default InputAnswerQuestionEditor;

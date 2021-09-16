import React from "react";
import { Header, QuizQuestionEditor } from "../components";

function QuizCreatingPanel({
  currentQuestionNumber,
  questions,
  setQuestions,
  questionType,
}) {
  return (
    <div className="QuizCreatingPanel">
      {/* Header */}
      <Header text="Create Quiz" />

      {/* Quiz Creating Panel */}
      {questions[currentQuestionNumber] ? (
        <QuizQuestionEditor
          currentQuestionNumber={currentQuestionNumber}
          questions={questions}
          setQuestions={setQuestions}
          questionType={questionType}
        />
      ) : null}
    </div>
  );
}

export default QuizCreatingPanel;

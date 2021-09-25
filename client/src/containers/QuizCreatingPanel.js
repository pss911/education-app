import React, { useEffect } from "react";
import { Header, QuizQuestionEditor } from "../components";

function QuizCreatingPanel({
  currentQuestionNumber,
  questions,
  setQuestions,
  questionType,
  setQuiz,
  setQuestionType,
  setQuestionNumbers,
}) {
  return (
    <div className="QuizCreatingPanel">
      {/* Header */}
      <Header text="Create Quiz" />

      {/* Quiz Creating Panel */}
      {questions[currentQuestionNumber] && (
        <QuizQuestionEditor
          currentQuestionNumber={currentQuestionNumber}
          questions={questions}
          setQuestions={setQuestions}
          questionType={questionType}
          setQuiz={setQuiz}
          setQuestionType={setQuestionType}
          setQuestionNumbers={setQuestionNumbers}
        />
      )}
    </div>
  );
}

export default QuizCreatingPanel;

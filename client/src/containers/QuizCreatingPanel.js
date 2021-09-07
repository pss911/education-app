import React from "react";
import { Header, QuizQuestionEditor } from "../components";

function QuizCreatingPanel() {
  return (
    <div className="QuizCreatingPanel">
      {/* Header */}
      <Header text="Create Quiz" />

      {/* Quiz Creating Panel */}
      <QuizQuestionEditor />
    </div>
  );
}

export default QuizCreatingPanel;

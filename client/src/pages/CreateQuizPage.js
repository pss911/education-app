import React from "react";
import "./styles.css";
import { QuizCreatingPanel } from "../containers";

function CreateQuizPage() {
  return (
    <div className="createquizpage">
      {/* Quiz Questions Panel */}
      {/* Create Quiz Panel */}
      <QuizCreatingPanel />
      {/* Quiz Details Panel*/}
    </div>
  );
}

export default CreateQuizPage;

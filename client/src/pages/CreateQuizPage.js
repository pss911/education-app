import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  QuizCreatingPanel,
  QuizDetailsPanel,
  QuestionDetailsPanel,
} from "../containers";
import { createQuestion } from "../utils/questions";
import { useParams } from "react-router";

function CreateQuizPage() {
  const params = useParams();
  const [quiz, setQuiz] = useState();
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState([]);
  const [questionNumbers, setQuestionNumbers] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(0);

  useEffect(() => {
    if (params.draftId) {
      const quizzes = JSON.parse(localStorage.getItem("Drafts"));
      const currentQuiz = quizzes.filter((v) => {
        return v.tempID === params.draftId;
      })[0];
      setQuiz(currentQuiz);
    }
  }, [params]);

  useEffect(() => {
    if (quiz) {
      setQuizName(quiz.name);
      setQuizDescription(quiz.description);
    }
  }, [quiz]);

  useEffect(() => {
    if (questions[0]) {
      setQuestionType(questions[currentQuestionNumber].questionType);
    }
  }, [currentQuestionNumber, questions]);

  useEffect(() => {
    if (questions[0]) {
      setQuestions((arr) => {
        arr[currentQuestionNumber].questionType = questionType;
        return arr;
      });
    }
  }, [questionType]);

  useEffect(() => {
    createQuestion(setQuestionNumbers, setQuestions);
  }, []);

  return (
    <>
      {params.draftId && (
        <div className="createquizpage">
          {/* Quiz Details Panel */}
          <QuizDetailsPanel
            quizName={quizName}
            setQuizName={setQuizName}
            quizDescription={quizDescription}
            setQuizDescription={setQuizDescription}
            files={quizImage}
            setFiles={setQuizImage}
          />
          {/* Create Quiz Panel */}
          <QuizCreatingPanel
            currentQuestionNumber={currentQuestionNumber}
            questions={questions}
            setQuestions={setQuestions}
            questionType={questionType}
          />
          {/* Quiz Details Panel*/}
          <QuestionDetailsPanel
            questionNumbers={questionNumbers}
            setCurrentQuestionNumber={setCurrentQuestionNumber}
            questionType={questionType}
            setQuestionType={setQuestionType}
          />
        </div>
      )}
    </>
  );
}

export default CreateQuizPage;

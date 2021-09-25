import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import {
  QuizCreatingPanel,
  QuizDetailsPanel,
  QuestionDetailsPanel,
} from "../containers";
import { createQuestion, deleteQuestion } from "../utils/questions";
import { useParams } from "react-router";
import { Toast, Loader } from "../components";
import { DbContext } from "../contexts/dbContext";

function CreateQuizPage() {
  const params = useParams();
  const db = useContext(DbContext);
  const [quiz, setQuiz] = useState();
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState([]);
  const [questionNumbers, setQuestionNumbers] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(0);
  const [quizType, setQuizType] = useState(0);
  const [quizLoaded, setQuizLoaded] = useState(false);

  useEffect(() => {
    if (quiz) {
      setQuizLoaded(true);
      setQuizName(quiz.name ? quiz.name : "");
      setQuizDescription(quiz.description ? quiz.description : "");
      setQuizType(quiz.type ? quiz.type : 0);
      setQuizImage(quiz.imageUrl ? [quiz.imageUrl] : []);
      setQuestions(quiz.questions ? quiz.questions : []);
    }
  }, [quiz]);

  useEffect(() => {
    if (questions[currentQuestionNumber]) {
      setQuestions(questions);
      setQuestionType(questions[currentQuestionNumber].questionType);
    }
  }, [currentQuestionNumber]);

  useEffect(() => {
    if (questions[0]) {
      setQuestions((arr) => {
        arr[currentQuestionNumber].questionType = questionType;
        return arr;
      });
    }
  }, [questionType]);

  useEffect(() => {
    if (quiz) {
      setQuiz({
        ...quiz,
        name: quizName,
        type: quizType,
        description: quizDescription,
      });
    }
  }, [quizName, quizDescription, quizType]);

  useEffect(() => {
    if (quizImage[0]) {
      setQuiz((prevStateQuiz) => {
        prevStateQuiz.imageUrl = quizImage[0];
        return prevStateQuiz;
      });
    }
  }, [quizImage]);

  useEffect(() => {
    let unmounted = false;
    if (params.draftId) {
      if (!quiz && !unmounted) {
        (async () => {
          const res = await db.collection("drafts").doc(params.draftId).get();
          setQuiz(res);
        })();
      }
    }

    return () => {
      unmounted = true;
    };
  }, [params, quiz]);

  const saveQuizToLocalDB = () => {
    db.collection("drafts").doc(params.draftId).set(quiz);
  };

  return (
    <>
      <Toast position="bottom-right" autoDeleteInterval={2000} />
      {quizLoaded ? (
        <div className="createquizpage">
          {/* Quiz Details Panel */}
          <QuizDetailsPanel
            quizName={quizName}
            setQuizName={setQuizName}
            quizDescription={quizDescription}
            setQuizDescription={setQuizDescription}
            quizImage={quizImage}
            setQuizImage={setQuizImage}
            createQuestion={() =>
              createQuestion(setQuestionNumbers, setQuestions)
            }
            saveQuizToLocalDB={saveQuizToLocalDB}
            questionNumbers={questionNumbers}
            setCurrentQuestionNumber={setCurrentQuestionNumber}
            quizType={quizType}
            setQuizType={setQuizType}
          />
          {/* Create Quiz Panel */}
          <QuizCreatingPanel
            setQuiz={setQuiz}
            currentQuestionNumber={currentQuestionNumber}
            questions={questions}
            setQuestions={setQuestions}
            questionType={questionType}
            setQuestionType={setQuestionType}
            setQuestionNumbers={setQuestionNumbers}
          />
          {/* Quiz Details Panel*/}
          <QuestionDetailsPanel
            questions={questions}
            currentQuestionNumber={currentQuestionNumber}
            questionNumbers={questionNumbers}
            setCurrentQuestionNumber={setCurrentQuestionNumber}
            questionType={questionType}
            setQuestionType={setQuestionType}
            deleteQuestion={() => {
              deleteQuestion(
                currentQuestionNumber,
                setQuestionNumbers,
                setQuestions
              );
            }}
          />
        </div>
      ) : (
        <>
          <Loader waitFor={3000} />
        </>
      )}
    </>
  );
}

export default CreateQuizPage;

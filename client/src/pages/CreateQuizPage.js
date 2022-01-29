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
import { dataURLtoFile } from "../utils/image";
import { storage } from "../firebase/config";
import { ACTIONS, ToastContext, TYPES } from "../contexts/toastContext";
import { v4 } from "uuid";

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

  const { dispatch } = useContext(ToastContext);

  useEffect(() => {
    if (quiz) {
      setQuizLoaded(true);
      setQuizName(quiz.name ? quiz.name : "");
      setQuizDescription(quiz.description ? quiz.description : "");
      setQuizType(quiz.type ? quiz.type : 0);
      setQuizImage(quiz.imageUrl ? [quiz.imageUrl] : []);
      if (!questions.length) setQuestions(quiz.questions ? quiz.questions : []);
    }
  }, [quiz]);

  useEffect(() => {
    if (questions[currentQuestionNumber]) {
      setQuestions(questions);
      setQuestionType(questions[currentQuestionNumber].questionType);
    }
  }, [currentQuestionNumber]);

  useEffect(() => {
    if (questions[currentQuestionNumber]) {
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
        questions: questions,
      });
    }
  }, [quizName, quizDescription, quizType, questions]);

  useEffect(() => {
    if (quizImage[currentQuestionNumber]) {
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

  const saveToDB = async () => {
    const _quiz = {};

    if (quizName) {
      _quiz.name = quizName;
    } else {
      return dispatch({
        type: ACTIONS.ADD,
        payload: {
          id: v4(),
          type: TYPES.DANGER,
          title: "Could Not Post",
          message: "Please provide a quiz name in order to post",
        },
      });
    }

    if (quizDescription) {
      _quiz.description = quizDescription;
    } else {
      return dispatch({
        type: ACTIONS.ADD,
        payload: {
          id: v4(),
          type: TYPES.DANGER,
          title: "Could Not Post",
          message: "Please provide a quiz description in order to post",
        },
      });
    }

    if (quizType) {
      _quiz.type = quizType;
    } else {
      _quiz.type = 0;
    }

    if (questions.length) {
      const _questions = [];

      for (let _index in questions) {
        let _question = questions[_index];

        if (!_question.question) {
          return dispatch({
            type: ACTIONS.ADD,
            payload: {
              id: v4(),
              type: TYPES.DANGER,
              title: "Could Not Post",
              message: `Please add question for Question ${
                parseInt(_index) + 1
              }`,
            },
          });
        }

        if (!_question.questionType) {
          _question.questionType = 0;
        }

        let answers_count = 0;
        let correct_answers_count = 0;

        if (
          _question.questionType === 0 &&
          _question.answers &&
          _question.correct_answer
        ) {
          for (let _answer_key in _question.answers) {
            if (_question.answers[_answer_key].trim() !== "") {
              answers_count++;
            }
            if (
              _question.correct_answer[_answer_key] &&
              _question.answers[_answer_key].trim() !== ""
            ) {
              correct_answers_count++;
            } else if (
              _question.correct_answer[_answer_key] &&
              !_question.answers[_answer_key].trim() !== ""
            ) {
              return dispatch({
                type: ACTIONS.ADD,
                payload: {
                  id: v4(),
                  type: TYPES.DANGER,
                  title: "Could Not Post",
                  message: `Selected correct answers donot have answers for ${
                    parseInt(_index) + 1
                  }`,
                },
              });
            }
          }
          console.log(answers_count);

          if (!answers_count || !correct_answers_count) {
            return dispatch({
              type: ACTIONS.ADD,
              payload: {
                id: v4(),
                type: TYPES.DANGER,
                title: "Could Not Post",
                message: `Please provideo proper answers for ${
                  parseInt(_index) + 1
                }`,
              },
            });
          }
        } else if (_question.questionType === 1 && _question.true_or_false) {
        } else if (_question.questionType === 2 && _question.input) {
        }
      }
    } else {
      return dispatch({
        type: ACTIONS.ADD,
        payload: {
          id: v4(),
          type: TYPES.DANGER,
          title: "Could Not Post",
          message: "Please add questions in order to post",
        },
      });
    }

    if (quizImage[0]) {
      const imageName = `${Math.floor(Math.random() * Date.now())}`;
      const refFile = storage.ref(`images/${imageName}`);
      const put = await refFile.child(imageName).put(quizImage[0]);
      _quiz.imageUrl = await put.ref.getDownloadURL();
      _quiz.imageId = imageName;
    }

    console.log(_quiz);
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
            saveQuizToDB={saveToDB}
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

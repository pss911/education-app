import React, { useEffect, useState } from "react";
import {
  CustomTextField,
  MultipleChoiceAnswersEditor,
  TrueOrFalseAnswerEditor,
  InputAnswerQuestionEditor,
} from "./";
import { useDropzone } from "react-dropzone";
import { getBase64 } from "../utils/image";

function QuizQuestionEditor({
  currentQuestionNumber,
  setQuestions,
  questions,
  questionType,
  setQuiz,
  setQuestionType,
  setQuestionNumbers,
}) {
  const [files, setFiles] = useState([]);

  // Question State
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });
  const [correct, setCorrect] = useState({
    answer1: false,
    answer2: false,
    answer3: false,
    answer4: false,
  });
  const [trueOrFalse, setTrueOrFalse] = useState();
  const [answer, setAnswer] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) =>
        getBase64(file, (result) => {
          setFiles([result]);
        })
      );
    },
  });

  useEffect(() => {
    if (question[currentQuestionNumber]) {
      setQuestions((existingQuestions) => {
        existingQuestions[currentQuestionNumber] = {
          ...existingQuestions[currentQuestionNumber],
          question,
          answers,
          imageUrl: files[0],
          correct_answer: correct,
          true_or_false: trueOrFalse,
          input: answer,
        };

        setQuiz((quiz) => {
          if (quiz) {
            quiz.questions = questions;
            return quiz;
          }
        });

        return existingQuestions;
      });
    }
  }, [
    question,
    answers,
    correct,
    trueOrFalse,
    answer,
    files,
    currentQuestionNumber,
    questions,
    setQuestions,
    setQuiz,
  ]);

  useEffect(() => {
    if (questions[currentQuestionNumber]) {
      setQuestion(questions[currentQuestionNumber].question);
      setQuestionNumbers(() => {
        const questionNumbersArray = [];
        for (let i = 1; i <= questions.length; i++) {
          questionNumbersArray.push(`Question ${i}`);
        }
        return questionNumbersArray;
      });
      setAnswers(questions[currentQuestionNumber].answers);
      setCorrect(questions[currentQuestionNumber].correct_answer);
      setTrueOrFalse(questions[currentQuestionNumber].true_or_false);
      setAnswer(questions[currentQuestionNumber].input);
      setFiles([questions[currentQuestionNumber].imageUrl]);
      setQuestionType(questions[currentQuestionNumber].questionType);
    }
  }, [questions, currentQuestionNumber, setQuestionNumbers, setQuestionType]);

  return (
    <div className="QuizQuestionEditor">
      <div>
        <CustomTextField
          type="text"
          label="Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          size="medium"
          required
          fullWidth
        />
      </div>
      <div className="QuizQuestionEditor__dragndrop" {...getRootProps()}>
        {files[0] ? (
          <img src={files[0]} alt="preview" />
        ) : (
          <img
            src="https://image.flaticon.com/icons/png/512/4814/4814775.png"
            alt="Drag and Drop"
          />
        )}
        <input {...getInputProps()} />
      </div>
      <>
        {questionType === 0 ? (
          <MultipleChoiceAnswersEditor
            answers={answers}
            setAnswers={setAnswers}
            correct={correct}
            setCorrect={setCorrect}
          />
        ) : null}
        {questionType === 1 ? (
          <TrueOrFalseAnswerEditor
            trueOrFalse={trueOrFalse}
            setTrueOrFalse={setTrueOrFalse}
            setQuestions={setQuestions}
          />
        ) : null}
        {questionType === 2 ? (
          <InputAnswerQuestionEditor
            answer={answer}
            setAnswer={setAnswer}
            currentQuestionNumber={currentQuestionNumber}
            questions={questions}
          />
        ) : null}
      </>
    </div>
  );
}

export default QuizQuestionEditor;

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
    if (questions[0]) {
      setQuestions((existingQuestions) => {
        existingQuestions[currentQuestionNumber] = {
          ...existingQuestions[currentQuestionNumber],
          question,
          answers,
          correct_answer: correct,
          true_or_false: trueOrFalse,
          input: answer,
        };

        return existingQuestions;
      });
    }
  }, [question, answers, correct, trueOrFalse, answer]);

  useEffect(() => {
    if (questions[0]) {
      setQuestion(questions[currentQuestionNumber].question);
      setAnswers(questions[currentQuestionNumber].answers);
      setCorrect(questions[currentQuestionNumber].correct_answer);
      setTrueOrFalse(questions[currentQuestionNumber].true_or_false);
      setAnswer(questions[currentQuestionNumber].input);
    }
  }, [currentQuestionNumber]);

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

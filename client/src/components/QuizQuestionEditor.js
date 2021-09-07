import React, { useState } from "react";
import {
  CustomTextField,
  MultipleChoiceAnswersEditor,
  TrueOrFalseAnswerEditor,
  InputAnswerQuestionEditor,
} from "./";
import { useDropzone } from "react-dropzone";

function QuizQuestionEditor() {
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
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div className="QuizQuestionEditor">
      <div>
        <CustomTextField
          type="text"
          id="outlined-basic"
          label="Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          size="medium"
          required
          autoFocus
          fullWidth
        />
      </div>
      <div className="QuizQuestionEditor__dragndrop" {...getRootProps()}>
        {files[0] ? (
          <img
            src={files[0].preview}
            className="QuizQuestionEditor__image"
            alt="preview"
          />
        ) : (
          <img
            src="https://image.flaticon.com/icons/png/512/4814/4814775.png"
            alt="Drag and Drop"
          />
        )}
        <input {...getInputProps()} />
      </div>
      <MultipleChoiceAnswersEditor
        answers={answers}
        setAnswers={setAnswers}
        correct={correct}
        setCorrect={setCorrect}
      />
      <TrueOrFalseAnswerEditor setTrueOrFalse={setTrueOrFalse} />
      <InputAnswerQuestionEditor answer={answer} setAnswer={setAnswer} />
    </div>
  );
}

export default QuizQuestionEditor;

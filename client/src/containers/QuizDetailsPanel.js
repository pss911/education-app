import React, { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { Autocomplete } from "@material-ui/lab";
import { v4 } from "uuid";
import { CustomButton, CustomTextField } from "../components";
import { ACTIONS, ToastContext, TYPES } from "../contexts/toastContext";
import { getBase64 } from "../utils/image";

function QuizDetailsPanel({
  quizName,
  setQuizName,
  quizDescription,
  setQuizDescription,
  quizImage,
  setQuizImage,
  createQuestion,
  saveQuizToLocalDB,
  questionNumbers,
  setCurrentQuestionNumber,
  quizType,
  setQuizType,
}) {
  const { dispatch } = useContext(ToastContext);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) =>
        getBase64(file, (result) => {
          setQuizImage([result]);
        })
      );
    },
  });

  const typeOption = ["Quiz Type", "Survey Type"];

  return (
    <div className="QuizDetailsPanel">
      {/* About the Quiz */}
      <CustomTextField
        type="text"
        variant="outlined"
        label="Quiz Name"
        size="medium"
        required
        autoFocus
        fullWidth
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        className="quiz_title"
      />
      <CustomTextField
        type="text"
        multiline
        variant="outlined"
        label="Quiz Description"
        size="medium"
        required
        fullWidth
        value={quizDescription}
        onChange={(e) => setQuizDescription(e.target.value)}
      />

      <div className="quizImage__dragndrop" {...getRootProps()}>
        {quizImage && quizImage[0] ? (
          <img src={quizImage[0]} alt="preview" />
        ) : (
          <img
            src="https://image.flaticon.com/icons/png/512/4814/4814775.png"
            alt="Drag and Drop"
          />
        )}
        <input {...getInputProps()} />
      </div>

      <Autocomplete
        value={typeOption[quizType]}
        options={typeOption}
        onChange={(e, v) => setQuizType(typeOption.indexOf(v))}
        getOptionLabel={(option) => option}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <CustomTextField {...params} label="Quiz Type" variant="outlined" />
        )}
        disableClearable={true}
        className="quiz_type"
      />

      <CustomButton
        text="Add Question"
        notSubmit
        onClick={() => {
          createQuestion();
          dispatch({
            type: ACTIONS.ADD,
            payload: {
              id: v4(),
              type: TYPES.INFO,
              title: "Added New Question",
              message: `Question ${questionNumbers.length + 1} has been added.`,
            },
          });
          setCurrentQuestionNumber(questionNumbers.length);
        }}
      />

      <CustomButton
        text="Save Quiz"
        notSubmit
        onClick={() => {
          saveQuizToLocalDB();
          dispatch({
            type: ACTIONS.ADD,
            payload: {
              id: v4(),
              type: TYPES.SUCCESS,
              title: "Saved Successfully",
              message: `Your quiz has been saved locally. `,
            },
          });
        }}
      />
      <CustomButton text="Publish Quiz" notSubmit />
    </div>
  );
}

export default QuizDetailsPanel;

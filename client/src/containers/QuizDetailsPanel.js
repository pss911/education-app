import React from "react";
import { useDropzone } from "react-dropzone";
import { CustomTextField } from "../components";
import { getBase64 } from "../utils/image";

function QuizDetailsPanel({
  quizName,
  setQuizName,
  quizDescription,
  setQuizDescription,
  files,
  setFiles,
}) {
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
    </div>
  );
}

export default QuizDetailsPanel;

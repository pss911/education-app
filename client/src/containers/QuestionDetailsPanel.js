import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { CustomButton, CustomTextField } from "../components";

function QuestionDetailsPanel({
  questionNumbers,
  setCurrentQuestionNumber,
  questionType,
  setQuestionType,
}) {
  const questionTypeOptions = [
    "Multiple Choice",
    "True Or False",
    "Input Based",
  ];

  return (
    <div className="QuestionDetailsPanel">
      {/* Quiz Question Number */}
      <Autocomplete
        defaultValue="Question 1"
        options={questionNumbers}
        onChange={(e, v) =>
          setCurrentQuestionNumber(questionNumbers.indexOf(v))
        }
        getOptionLabel={(option) => option}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Select Question"
            variant="outlined"
          />
        )}
        disableClearable={true}
      />

      {/*  Question Type Selection  */}
      <Autocomplete
        defaultValue="Multiple Choice"
        options={questionTypeOptions}
        onChange={(e, v) => {
          setQuestionType(questionTypeOptions.indexOf(v));
        }}
        value={questionTypeOptions[questionType]}
        inputValue={questionTypeOptions[questionType]}
        getOptionLabel={(option) => option}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Select Question"
            variant="outlined"
          />
        )}
        disableClearable={true}
        className="question_type__selector"
      />
      <div className="save_or_dont">
        <CustomButton text="Save" notSubmits />
        <CustomButton text="Delete" notSubmit />
      </div>
    </div>
  );
}

export default QuestionDetailsPanel;

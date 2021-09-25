import React, { useEffect, useRef, useContext } from "react";
import { Autocomplete } from "@material-ui/lab";
import { ACTIONS, ToastContext, TYPES } from "../contexts/toastContext";
import { CustomButton, CustomTextField } from "../components";
import { v4 } from "uuid";

function QuestionDetailsPanel({
  questionNumbers,
  setCurrentQuestionNumber,
  questionType,
  setQuestionType,
  deleteQuestion,
  currentQuestionNumber,
}) {
  const questionTypeOptions = [
    "Multiple Choice",
    "True Or False",
    "Input Based",
  ];

  const isQuestionNumbers = () => {
    return questionNumbers[currentQuestionNumber] !== undefined;
  };

  const questionDetailsRef = useRef();

  useEffect(() => {
    if (questionDetailsRef.current) {
      questionDetailsRef.current.hidden = false;
    }
  }, [questionNumbers]);

  const { dispatch } = useContext(ToastContext);

  return (
    <div className="QuestionDetailsPanel">
      {/* Quiz Question Number */}
      <Autocomplete
        value={
          isQuestionNumbers() ? questionNumbers[currentQuestionNumber] : ""
        }
        options={questionNumbers}
        onChange={(e, v) =>
          setCurrentQuestionNumber(questionNumbers.indexOf(v))
        }
        getOptionLabel={(option) => option}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <CustomTextField {...params} label="Question" variant="outlined" />
        )}
        disableClearable={true}
      />

      {/*  Question Type Selection  */}
      {isQuestionNumbers() ? (
        <div ref={questionDetailsRef}>
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
                label="Question Type"
                variant="outlined"
              />
            )}
            disableClearable={true}
            className="question_type__selector"
          />
          <div className="delete">
            <CustomButton
              text="Delete"
              notSubmit
              onClick={() => {
                const questionNumber = questionNumbers[currentQuestionNumber];
                deleteQuestion();
                if (questionNumbers.length <= 0) {
                  questionDetailsRef.current.hidden = true;
                }
                dispatch({
                  type: ACTIONS.ADD,
                  payload: {
                    id: v4(),
                    type: TYPES.DANGER,
                    title: "Deleted The Question",
                    message: `${questionNumber} has been deleted.`,
                  },
                });
                setCurrentQuestionNumber((i) => {
                  if (questionNumbers.length === 1) {
                    return 0;
                  } else if (i <= 0) {
                    return i + 1;
                  } else if (i > 0) {
                    return i - 1;
                  }
                });
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QuestionDetailsPanel;

const createQuestion = (setQuestionNumbers, setQuestions) => {
  setQuestionNumbers((arr) => [...arr, `Question ${arr.length + 1}`]);
  setQuestions((arr) => {
    const newArr = [
      ...arr,
      {
        question: "",
        questionType: 0,
        answers: {
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
        },
        correct_answer: {
          answer1: false,
          answer2: false,
          answer3: false,
          answer4: false,
        },
        true_or_false: undefined,
        input: "",
      },
    ];
    return newArr;
  });
};

const deleteQuestion = (index, setQuestionNumbers, setQuestions) => {
  setQuestionNumbers((arr) => {
    arr.splice(index, 1);
    setQuestions((arr) => {
      arr.splice(index, 1);
      return arr;
    });
    return arr;
  });
};

const updateQuestion = (setQuestionNumbers) => {
  setQuestionNumbers((arr) => {
    let return_arr = [];
    for (let i = 0; i < arr.length; i++) {
      return_arr.push(`Question ${i + 1}`);
    }
    return return_arr;
  });
};

export { createQuestion, updateQuestion, deleteQuestion };

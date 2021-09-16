import { useEffect } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

function CreateQuizOriginalPage() {
  const history = useHistory();

  useEffect(() => {
    const uuid = uuidv4();
    const quiz = {
      name: "",
      description: "",
      tempID: uuid,
      imageUrl: "",
      questionCount: 0,
      questions: [],
    };
    const quizzes = JSON.parse(localStorage.getItem("Drafts"));
    if (quizzes) {
      localStorage.setItem("Drafts", JSON.stringify([...quizzes, quiz]));
    } else {
      localStorage.setItem("Drafts", JSON.stringify([quiz]));
    }
    history.push(`/drafts/${uuid}`);
  }, []);

  return null;
}

export default CreateQuizOriginalPage;

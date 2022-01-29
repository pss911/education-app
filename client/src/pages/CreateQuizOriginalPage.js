import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { DbContext } from "../contexts/dbContext";

function CreateQuizOriginalPage() {
  const history = useHistory();
  const db = useContext(DbContext);

  useEffect(() => {
    const uuid = uuidv4();
    const quiz = {
      name: "",
      description: "",
      type: 0,
      imageUrl: "",
      imageId: "",
      questions: [],
    };
    db.collection("drafts").add(quiz, uuid);
    history.replace(`/drafts/${uuid}`);
  }, [db, history]);

  return null;
}

export default CreateQuizOriginalPage;

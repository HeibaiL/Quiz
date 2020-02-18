import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../store/actions";

function Quiz(props) {
  const {
    quiz,
    quiz: { answers },
    title,
    saveAnswer
  } = props;
  const [stateAnswer, useAnswer] = useState("");
  const dispatch = useDispatch();
  const {appAnswers} = useSelector(state => ({ ...state }));
  const chosenStyle = { background: "#343240" };

  return (
    <div className="quiz">
      <h1 style={{ color: "white" }} className="quiz-title">
        {title}
      </h1>
      <h1>{quiz.question}</h1>
      <ul className="answers">
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}
export default Quiz;

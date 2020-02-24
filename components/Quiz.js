import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../store/actions";

function Quiz(props) {
  const {
    quiz,
    quiz: { question, answers },
    title
  } = props;
  return (
    <div className="quiz">
      <h1 style={{ color: "white" }} className="quiz-title">
        {title}
      </h1>
      <h1>{question}</h1>
      <ul className="answers">
        {answers.map(answer => (
          <li key={answer.id}>{answer.text}</li>
        ))}
      </ul>
    </div>
  );
}
export default Quiz;

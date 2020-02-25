import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../store/actions";

function Quiz(props) {
  const {
    lastQuestion,
    quiz,
    chooseAnswer,
    quiz: { question, answers, chosenAnswer },
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
          <li
            key={answer.id}
            style={
              answer.text === chosenAnswer ? { backgroundColor: "black" } : null
            }
            onClick={e => chooseAnswer(answer.text, quiz.id)}
          >
            {answer.text}
          </li>
        ))}
      </ul>
      {lastQuestion ? (
        <button className="submit-answers">Sumbit Answers</button>
      ) : null}
    </div>
  );
}
export default Quiz;

import React, { useEffect, useState, useMemo } from "react";
import uuid from "react-uuid";

import { DefineAnswer } from "./DefineAnswer.js";

export const DefineQuiz = () => {
  const [allAnswers, setAllAnswers] = useState([]);
  let id = 0;

  const renderAnswers = useMemo(
    () =>
      allAnswers.map(answer => {
        return <DefineAnswer answer={answer} key={answer.id} />;
      }),
    [allAnswers]
  );
  console.log(allAnswers)

  return (
    <div className="define main">
      <h1> Define new quiz</h1>
      <span
        onClick={() =>
          setAllAnswers(allAnswers.concat({ id: uuid(), text: "" }))
        }
        className="add-answers"
      >
        <i className="fas fa-plus"></i>
        <a>Add Answers</a>
      </span>
      <span
        onClick={() => useNumOfAnswers(numOfAnswers + 1)}
        className="next-question"
      >
        <i className="fas fa-arrow-right"></i>
        <a>Next Question</a>
      </span>
      <div className="define-quiz">
        <div className="define-question">
          <input></input>
          <p>Define your question</p>
        </div>
        <div className="answers">{renderAnswers}</div>
      </div>
    </div>
  );
};

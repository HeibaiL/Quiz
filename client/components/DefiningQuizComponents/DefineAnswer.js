import React, { useEffect, useState } from "react";

export function DefineAnswer({
  handleAnswerInput,
  answer: { id },
  defineCorrectAnswer
}) {
  const [correct, useCorrect] = useState(false);

  return (
    <div className="define-answers">
      <input
        id={id}
        name="question"
        onChange={e => handleAnswerInput(e)}
      ></input>
      <i
        className={correct ? "far fa-check-circle" : "fas fa-times"}
        onClick={() => {
          !correct ? defineCorrectAnswer(id) : null;
          useCorrect(!correct);
        }}
      ></i>
    </div>
  );
}

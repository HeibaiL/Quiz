import React, { useEffect, useState } from "react";

export function DefineAnswer({ handleAnswerInput, answer: { id } }) {
  return (
    <div className="define-answers">
      <input
        id={id}
        name="question"
        onChange={e => handleAnswerInput(e)}
      ></input>
      Define answer
    </div>
  );
}

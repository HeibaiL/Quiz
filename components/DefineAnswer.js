import React, { useEffect, useState } from "react";

export function DefineAnswer({ handleInput, answer }) {
  return (
    <div className="define-answers">
      <input
        id={answer.id}
        name="question"
        onChange={e => handleInput(e)}
      ></input>
      Define answer
    </div>
  );
}

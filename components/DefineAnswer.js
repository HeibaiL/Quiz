import React, { useEffect, useState } from "react";

export function DefineAnswer(props) {
  const [inputValue, useValue] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    useValue(value);
    props.answer.text=inputValue;
  }

  return (
    <div className="define-answers">
      <input
        id={props.answer.id}
        value={inputValue}
        name="question"
        onChange={e => handleChange(e)}
      ></input>
      Define answer
    </div>
  );
}

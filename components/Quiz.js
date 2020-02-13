import React from "react";

export function Quiz({quiz}) {
    let id=0;
  return (
    <div className="quiz">
      <h1>{quiz.question}</h1>
      <ul className="answers">
      {quiz.answers.map(answer=>{
        id+=1;
      return <li key={id}>{answer}</li>})}
      </ul>
    </div>
  );
}

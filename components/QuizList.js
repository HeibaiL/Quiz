import React from "react";

export const QuizList = (props) => {
    let id = 0;
  return <div className="quizList">
      <ul className="list">
            {props.quizes.map(quiz=>(
                <li key = {quiz.id} onClick = {()=>props.chooseQuiz(quiz.title)}>{quiz.title}</li>
            ))}
      </ul>
  </div>;
};

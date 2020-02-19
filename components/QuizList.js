import React from "react";
import { Link } from "react-router-dom";

export const QuizList = props => {
  let id = 0;
  return (
    <div className="quizList">
      <ul className="list">
        {props.quizes.map(quiz => (
          <li key={quiz.id} onClick={() => props.chooseQuiz(quiz.title)}>
            <Link to="/">{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

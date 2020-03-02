import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const QuizList = props => {
  const { quizes, chooseQuiz } = props;

  return (
    <div className="quizList">
      <ul className="list">
        {quizes.map(quiz => (
          <li key={quiz._id} onClick={() => chooseQuiz(quiz.title)}>
            <Link to="/">
              <p>{quiz.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

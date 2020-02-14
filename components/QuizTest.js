import React, { useState, useEffect } from "react";
import { quizes } from "../quizes";
import Quiz from "./Quiz";

export const QuizTest = () => {
  const [quizNum, useQuizNum] = useState(1);

  function showQuiz(num) {
    return quizes.map((quiz, index) => {
      if (index === num - 1) {
        return <Quiz quiz={quiz} key={quiz.id} />;
      }
    });
  }
  //Max and min quizNum = quiz numbers
  if (quizNum > quizes.length) {
    useQuizNum(1);
  } else if (quizNum < 1) {
    useQuizNum(quizes.length);
  }

  return (
    <div className="quizTest">
      <i
        className="fas fa-chevron-left previous"
        onClick={() => useQuizNum(quizNum - 1)}
      ></i>
      <i
        className="fas fa-chevron-right next"
        onClick={() => useQuizNum(quizNum + 1)}
      ></i>
      {showQuiz(quizNum)}
    </div>
  );
};

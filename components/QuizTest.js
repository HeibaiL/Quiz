import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";

export const QuizTest = props => {
  const [questionNum, useQuestionNum] = useState(1);
  const {
    quiz,
    quiz: { data, title }
  } = props;

  //Start with 1st question when quiz changed
  useEffect(() => useQuestionNum(1), [quiz]);

  function showQuiz(num) {
    return data.map((quiz, index) => {
      if (index === num - 1) {
        return <Quiz quiz={quiz} title={title} key={index} />;
      }
    });
  }

  // Max and min quizNum = quiz numbers
  if (data) {
    if (questionNum > data.length) {
      useQuestionNum(1);
    } else if (questionNum < 1) {
      useQuestionNum(data.length);
    }
  }

  return (
    <div className="quizTest">
      <i
        className="fas fa-chevron-left previous"
        onClick={() => useQuestionNum(questionNum - 1)}
      ></i>
      <i
        className="fas fa-chevron-right next"
        onClick={() => useQuestionNum(questionNum + 1)}
      ></i>
      {data ? showQuiz(questionNum) : null}
    </div>
  );
};

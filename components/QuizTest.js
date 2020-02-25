import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";

export const QuizTest = props => {
  const [questionNum, useQuestionNum] = useState(1);
  const [userAnswers, useUserAnswers] = useState({});
  const [lastQuestion, useLastQuestion] = useState(false);

  const submitAnswers = () => {};

  const chooseAnswer = (answer, id) => {
    const answerArr = userAnswers.data.map(data => {
      return id === data.id ? { ...data, chosenAnswer: answer } : data;
    });
    useUserAnswers({ ...userAnswers, data: answerArr });
  };
  const { data, title } = userAnswers;

  //Start with 1st question when quiz changed
  useEffect(() => {
    useUserAnswers({ ...props.quiz });
  }, []);

  useEffect(() => {
    if (data) {
      if (data.length === questionNum) {
        useLastQuestion(true);
      } else {
        useLastQuestion(false);
      }
    }
  }, [questionNum]);

  function showQuiz(num) {
    if (userAnswers.data)
      return userAnswers.data.map((quiz, index) => {
        if (index === num - 1) {
          return (
            <Quiz
              quiz={quiz}
              title={title}
              key={quiz.id}
              chooseAnswer={chooseAnswer}
              lastQuestion={lastQuestion}
            />
          );
        }
      });
  }

  // Max and min quizNum = quiz numbers
  if (data) {
    if (questionNum > data.length) {
      useQuestionNum(data.length);
    } else if (questionNum < 1) {
      useQuestionNum(1);
    }
  }
  return (
    <div className="quizTest main">
      {data ? (
        <div style={{ height: "90%" }}>
          <span>
            {questionNum}/{data.length}
          </span>
      { questionNum>1?  <i
            className="fas fa-chevron-left previous"
            onClick={() => useQuestionNum(questionNum - 1)}
          ></i>:null}
        { !lastQuestion? <i
            className="fas fa-chevron-right next"
            onClick={() => useQuestionNum(questionNum + 1)}
          ></i>:null}
          {showQuiz(questionNum)}
        </div>
      ) : null}
    </div>
  );
};

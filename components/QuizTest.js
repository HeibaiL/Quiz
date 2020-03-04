import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";

export const QuizTest = props => {
  const [questionNum, useQuestionNum] = useState(1);
  const [userAnswers, useUserAnswers] = useState({});
  const [lastQuestion, useLastQuestion] = useState(false);

  const { quiz } = props;

  const chooseAnswer = (answer, id) => {
    const answerArr = userAnswers.data.map(data => {
      return id === data.id ? { ...data, chosenAnswer: answer } : data;
    });
    useUserAnswers({ ...userAnswers, data: answerArr });
  };
  //Start with 1st question when quiz changed
  useEffect(() => {
    useUserAnswers({ ...props.quiz });
  }, [props.quiz]);

  useEffect(() => {
    if (quiz.data) {
      if (quiz.data.length === questionNum) {
        useLastQuestion(true);
      } else {
        useLastQuestion(false);
      }
    }
  }, [questionNum]);

  function showQuiz(num) {
    if (userAnswers.data)
      return userAnswers.data.map((quizData, index) => {
        if (index === num - 1) {
          return (
            <Quiz
              quiz={quizData}
              title={userAnswers.title}
              key={quizData.id}
              chooseAnswer={chooseAnswer}
              lastQuestion={lastQuestion}
            />
          );
        }
      });
  }

  return (
    <div className="quizTest main">
      {quiz ? (
        <div style={{ height: "90%" }}>
          <span>
            {questionNum}/{quiz.data.length}
          </span>
          {questionNum > 1 ? (
            <i
              className="fas fa-chevron-left previous"
              onClick={() => useQuestionNum(questionNum - 1)}
            ></i>
          ) : null}
          {!lastQuestion ? (
            <i
              className="fas fa-chevron-right next"
              onClick={() => useQuestionNum(questionNum + 1)}
            ></i>
          ) : null}
          {showQuiz(questionNum)}
        </div>
      ) : null}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { submitAnswers } from "../store/actions";
import Quiz from "./Quiz";

export const QuizTest = () => {
  const [questionNum, useQuestionNum] = useState(1);
  const [lastQuestion, useLastQuestion] = useState(false);
  const [userAnswers, useUserAnswers] = useState({});
  const dispatch = useDispatch();
  const { selectedQuiz } = useSelector(state => ({
    selectedQuiz: state.selectedQuiz,
    availableQuizes: state.availableQuizes
  }));

  useEffect(() => useUserAnswers({ ...selectedQuiz }), [selectedQuiz]);

  const chooseAnswer = (answer, id) => {
    const answerArr = userAnswers.data.map(data => {
      return id === data.id ? { ...data, chosenAnswer: answer } : data;
    });
    useUserAnswers({ ...userAnswers, data: answerArr });
  };

  useEffect(() => {
    if (selectedQuiz.data) {
      if (selectedQuiz.data.length === questionNum) {
        useLastQuestion(true);
      } else {
        useLastQuestion(false);
      }
    }
  }, [questionNum]);

  function submitUserAnswers() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const submittedAnswers = {
      user: localStorage.getItem("currentUser"),
      date: dateTime,
      data: {}
    };
    const updatedArr = userAnswers.data.map(question => {
      return question.chosenAnswer ? question : null;
    });

    const notAnswered = updatedArr.indexOf(null);
    if (notAnswered !== -1) {
      return console.log("you haven't answered all of the questions");
    }
    for (let i = 0; i < updatedArr.length; i++) {
      submittedAnswers.data[i] = updatedArr[i];
    }
    dispatch(submitAnswers(userAnswers.title, submittedAnswers));
  }

  function showQuiz(num) {
    if (userAnswers.data) {
      return userAnswers.data.map((quizData, index) => {
        if (index === num - 1) {
          return (
            <Quiz
              submitUserAnswers={submitUserAnswers}
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
  }

  return (
    <div className="quizTest main">
      {selectedQuiz.data ? (
        <div style={{ height: "90%" }}>
          <span>
            {questionNum}/{selectedQuiz.data.length}
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

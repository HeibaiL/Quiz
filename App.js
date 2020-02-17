import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gotQuizes } from "./quizes";
import { setQuiz } from "./store/actions";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { QuizList } from "./components/QuizList";
import { QuizTest } from "./components/QuizTest";

export const App = props => {
  const {
    appAnswers: { quizes }
  } = useSelector(state => ({ ...state }));

  const dispatch = useDispatch();

  const [chosenQuiz, useChosenQuiz] = useState("");

  useEffect(() => {
    dispatch(setQuiz(gotQuizes));
  }, []);

  function chooseQuiz(title) {
    let quiz = quizes.find(quiz => quiz.title === title);
    useChosenQuiz(quiz);
  }

  return (
    <div className="app">
      <Header />
      <QuizList chooseQuiz={chooseQuiz} quizes={quizes} />
      <QuizTest quiz={chosenQuiz} />
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { setQuiz } from "./store/actions";
import { Header } from "./components/Header";
import { MainDefineQuiz } from "./components/MainDefineQuiz";
import { QuizList } from "./components/QuizList";
import { QuizTest } from "./components/QuizTest";

export const App = () => {
  const dispatch = useDispatch();

  const [quizes, useQuizes] = useState([]);
  const [chosenQuiz, useChosenQuiz] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then(res => res.json())
      .then(data => {
        useQuizes(data);
        dispatch(setQuiz(data));
      });
  }, [chosenQuiz]);

  function chooseQuiz(title) {
    let quiz = quizes.find(quiz => quiz.title === title);
    useChosenQuiz(quiz);
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <QuizList chooseQuiz={chooseQuiz} quizes={quizes} />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <QuizTest quiz={chosenQuiz} />}
          />
          <Route path="/definequiz" component={MainDefineQuiz} />
        </Switch>
      </div>
    </Router>
  );
};

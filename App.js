import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { gotQuizes } from "./quizes";
import { setQuiz } from "./store/actions";
import { Header } from "./components/Header";
import { DefineQuiz } from "./components/DefineQuiz";
import { QuizList } from "./components/QuizList";
import { QuizTest } from "./components/QuizTest";

export const App = props => {
  const {
    appAnswers: { quizes }
  } = useSelector(state => ({ ...state }));

  const dispatch = useDispatch();

  const [chosenQuiz, useChosenQuiz] = useState("");
  const [activePage, useActivePage] = useState("");

  useEffect(() => {
    dispatch(setQuiz(gotQuizes));
  }, []);

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
          <Route path="/definequiz" component={() => <DefineQuiz />} />
        </Switch>
      </div>
    </Router>
  );
};

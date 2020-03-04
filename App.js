import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Login } from "./components/Login";
import { setQuiz } from "./store/actions";
import { Header } from "./components/Header";
import { MainDefineQuiz } from "./components/MainDefineQuiz";
import { QuizList } from "./components/QuizList";
import { QuizTest } from "./components/QuizTest";

export const App = () => {
  const dispatch = useDispatch();
  const [loggedUser, useLoggedUser] = useState(null);
  const [quizes, useQuizes] = useState([]);
  const [chosenQuiz, useChosenQuiz] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then(res => res.json())
      .then(data => {
        useQuizes(data);
        dispatch(setQuiz(data));
      });
    const token = localStorage.getItem("auth-token");
    useLoggedUser(token);
  }, [chosenQuiz]);

  function chooseQuiz(title) {
    let quiz = quizes.find(quiz => quiz.title === title);
    useChosenQuiz(quiz);
  }
  function logOut() {
    localStorage.removeItem("auth-token");
    useLoggedUser(null);
  }
  return (
    <Router>
      <div className="app">
        <Header loggedUser={loggedUser} logOut={logOut} />
        <QuizList chooseQuiz={chooseQuiz} quizes={quizes} />
        <Switch>
          <Route
            path="/login"
            render={() => <Login useLoggedUser={useLoggedUser} />}
          />
          <Route path="/" exact render={() => <QuizTest quiz={chosenQuiz} />} />
          <Route
            path="/definequiz"
            render={() =>
              loggedUser ? (
                <MainDefineQuiz loggedUser={loggedUser} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

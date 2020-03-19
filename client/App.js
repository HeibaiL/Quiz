import React, { useState, useEffect, useLayoutEffect } from "react";
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

  useEffect(() => {
    fetch("http://localhost:4000")
      .then(res => res.json())
      .then(data => {
        dispatch(setQuiz(data));
      });
    const token = localStorage.getItem("auth-token");
    useLoggedUser(token);
  }, []);

  function logOut() {
    localStorage.removeItem("auth-token");
    useLoggedUser(null);
  }
  return (
    <Router>
      <div className="app">
        <Header loggedUser={loggedUser} logOut={logOut} />
        <QuizList />
        <Switch>
          <Route
            path="/login"
            render={() =>
              loggedUser ? (
                <Redirect to="/definequiz" />
              ) : (
                <Login useLoggedUser={useLoggedUser} />
              )
            }
          />
          <Route path="/" exact render={() => <QuizTest />} />
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

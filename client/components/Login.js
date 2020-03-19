import React, { useState } from "react";
import { SignUp } from "./SignUp";
import schema from "../joiModels/joiLoginModel";

export const Login = props => {
  const [loginUser, useLoginUser] = useState({ email: "", password: "" });
  const [showSignUp, useShowSignUp] = useState(false);
  const [isError, useError] = useState("");

  const handleChange = e => {
    const { value, name } = e.target;
    useLoginUser({ ...loginUser, [name]: value });
  };
  function changeShowSignUp() {
    useShowSignUp(!showSignUp);
  }
  function showError(error) {
    if (isError) return;
    useError(error);
    setTimeout(() => useError(""), 2500);
    return isError;
  }

  function postUser() {
    const { error } = schema.validate({ ...loginUser });
    if (error) return showError(error.message);

    fetch("http://localhost:4000/login", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ ...loginUser }),
      mode: "cors"
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          return showError("E-mail or password isn't valid");
        }
      })
      .then(({ token, email }) => {
        props.useLoggedUser(token);
        localStorage.setItem("auth-token", token);
        localStorage.setItem("currentUser", email);
      })
      .catch(err => {
        console.log("Error logining in", err);
      });
  }
  return (
    <div>
      {showSignUp ? (
        <SignUp changeShowSignUp={changeShowSignUp} />
      ) : (
        <div className="login main">
          <div className="loginin window">
            {isError ? <div className="error">{isError}</div> : null}
            <div className="login-logo">
              <i className="fas fa-ice-cream logo-icon"></i>
              Quizzeee
            </div>
            <div className="login-main">
              <label htmlFor="username">
                <i className="fas fa-user"></i>
              </label>
              <input
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="E-mail"
              />
              <label htmlFor="password">
                <i className="fas fa-key"></i>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <button className="login-in" onClick={() => postUser()}>
                Log In
              </button>
              <div className="sign-up">
                <a>Forgot password?</a>
                <a onClick={() => changeShowSignUp()}>Sign up</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

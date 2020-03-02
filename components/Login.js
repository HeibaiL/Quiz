import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignUp } from "./SignUp";
import schema from "../models/joiLoginModel";

export const LoginComponent = () => {
  const [loginUser, useLoginUser] = useState({ email: "", password: "" });
  const [isError, useError] = useState("");

  const handleChange = e => {
    const { value, name } = e.target;
    useLoginUser({ ...loginUser, [name]: value });
  };

  function showError(error) {
    if (isError) return;
    useError(error);
    setTimeout(() => useError(""), 2500);
    return isError;
  }

  function postUser() {
    const user = { ...loginUser };
    const { error } = schema.validate(user);
    if (error) return showError(error.message);

    try {
      fetch("http://localhost:4000/login", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ ...user }),
        mode: "cors"
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 401) {
            return showError("E-mail or password isn't valid");
          }
        })
        .then(data => console.log(data))
        .catch(err => {
          console.log("Error signing up:", err);
        });
    } catch (error) {
      console.log("we got err", error);
    }
  }

  return (
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
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

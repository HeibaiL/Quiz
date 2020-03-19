import React, { useState } from "react";
import schema from "../joiModels/joiSignUpModel";

export const SignUp = (props) => {
  const [signUpUser, useSignUpUser] = useState({
    login: "",
    password: "",
    name: "",
    email: ""
  });
  const [userCreatedScreen, useUserCreatedScreen] = useState(false);
  const [isError, useError] = useState("");

  function showError(error) {
    if(isError) return;
    useError(error);
    setTimeout(() => useError(""), 2500);
    return isError;
  }

  function postUser() {
    const user = { ...signUpUser };
    const { error } = schema.validate(user);
    if (error) return showError(error.message);

    fetch("http://localhost:4000/signup", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ ...user }),
      mode: "cors"
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          return showError("E-mail already exists");
        }
      })
      .then(data => (data === isError ? null : useUserCreatedScreen(true)))
      .catch(err => {
        console.log("Error signing up:", err);
      });
  }

  const handleChange = e => {
    const { value, name } = e.target;
    useSignUpUser({ ...signUpUser, [name]: value });
  };

  return (
    <div className="login main">
      {userCreatedScreen ? (
        <div className="completed">
          <span>
            <i className="fas fa-check-circle"></i> Account was successfully
            created
          </span>
        </div>
      ) : (
        <div className="signup window">
          {isError ? <div className="error">{isError}</div> : null}
          <div className="login-logo">
            <i className="fas fa-ice-cream logo-icon"></i>
            Quizzeee
          </div>
          <div className="signup-main">
            <input
              id="login"
              name="login"
              onChange={handleChange}
              placeholder="Login"
            />

            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <input
              id="name"
              name="name"
              type="name"
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="E-mail"
            />
            <button className="login-in" onClick={() => postUser(signUpUser)}>
              Sign Up
            </button>
            <div className="sign-up">
              <a>Forgot password?</a>
              <a onClick={() => props.changeShowSignUp()}>Log in</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

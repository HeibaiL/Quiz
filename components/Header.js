import React from "react";
import { Link } from "react-router-dom";

export const Header = props => {
  const { loggedUser,logOut } = props;

  return (
    <div className="header">
      <nav>
        <span className="logo">
          <i className="fas fa-ice-cream logo-icon"></i>
          <Link to="/" className="logo-text">
            Quizzeee
          </Link>
        </span>
        <ul>
          <li>
            <a href="#">View</a>
          </li>
          <li>
            <Link to="/definequiz"> Define quiz</Link>
          </li>
          {loggedUser ? (
            <li onClick={()=>logOut()}>
              <a>Log Out</a>
            </li>
          ) : (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
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
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

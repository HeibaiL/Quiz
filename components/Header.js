import React from "react";
import { Link } from "react-router-dom";

export const Header = props => {
  return (
    <div className="header">
      <nav>
        <span className="logo">
          <i className="fas fa-ice-cream logo-icon"></i>
          <a href="/" className="logo-text">
            Quizzeee
          </a>
        </span>
        <ul>
          <li>
            <a href="#">View</a>
          </li>
          <li>
            <Link to="/definesurvey">Define survey</Link>
          </li>
          <li>
            <a href="#">Log in</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

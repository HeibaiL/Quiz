import React from "react";

export const Header = () => {
  return (
    <div className="header">
      <nav>
        <span className="logo">
          <i className="fas fa-ice-cream logo-icon"></i>
          <a href="#" className="logo-text">
            Quizzeee
          </a>
        </span>
        <ul>
          <li>
            <a href="#">Define survey</a>
          </li>
          <li>
            <a href="#">Log in</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

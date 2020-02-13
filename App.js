import React from "react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { QuizList } from "./components/QuizList";
import { QuizTest } from "./components/QuizTest";

export const App = () => (
  <div className="app">
    <Header />
    <QuizList />
    <QuizTest />
    {/* <Footer /> */}
  </div>
);

import React, { useEffect, useState, useMemo } from "react";
import uuid from "react-uuid";

import { DefineAnswer } from "./DefineAnswer.js";

export const DefineQuiz = () => {
  const [questionInput, useQuestion] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [questionAnswers, useQuestionAnswers] = useState([]);

  //start with 2 answers
  function handleQuestion(e) {
    const { value } = e.target;
    useQuestion(value);
  }
  function loadAnswers(){
    setAllAnswers(
      [].concat({ id: uuid(), text: "" }, { id: uuid(), text: "" })
    );
  }
  useEffect(() => {
   loadAnswers();
  }, [questionAnswers]);

  function createQuestionAnswer() {
    useQuestionAnswers(questionAnswers.concat({ question: questionInput, answers: allAnswers }));
    useQuestion("");

  };

  function handleInput(e) {
    const { id, value } = e.target;
    const newArr = allAnswers.map(answer => {
      return answer.id === id ? { ...answer, text: value } : answer;
    });
    setAllAnswers(newArr);
  }
  console.log(questionAnswers)
  const renderAnswers = useMemo(
    () =>
      allAnswers.map(answer => {
        return (
          <DefineAnswer
            handleInput={handleInput}
            answer={answer}
            key={answer.id}
          />
        );
      }),
    [allAnswers]
  );
  return (
    <div className="define main">
      <h1> Define new quiz</h1>
      <span
        onClick={() =>
          setAllAnswers(allAnswers.concat({ id: uuid(), text: "" }))
        }
        className="add-answers"
      >
        <i className="fas fa-plus"></i>
        <a>Add Answers</a>
      </span>
      <span onClick={() => createQuestionAnswer()} className="next-question">
        <i className="fas fa-arrow-right"></i>
        <a>Next Question</a>
      </span>
      <div className="define-quiz">
        <div className="define-question">
          <input onChange={e => handleQuestion(e)} value={questionInput}></input>
          <p>Define your question</p>
          <p>{questionAnswers.length+1}/10</p>
        </div>
        <div className="answers">{renderAnswers}</div>
      </div>
    </div>
  );
};

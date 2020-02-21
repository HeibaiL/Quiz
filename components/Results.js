import React, { useState, useEffect } from "react";

export const Results = props => {
  const {
    handleAnswerEdit,
    questionAnswer,
    questionAnswer: { question, answers },
    index,
    deleteQuestion,
    handleQuestionEdit
  } = props;
  const [editing, useEditing] = useState(false);

  function showResult() {
    return (
      <div className="showResult">
        <h2>
          {index + 1}. {question}
        </h2>
        <i
          onClick={() => useEditing(true)}
          className="fas fa-pen define-correct"
        ></i>
        <i
          onClick={() => deleteQuestion(questionAnswer.id)}
          className="fas fa-times define-cancel"
        ></i>
        {answers.map(({ text, id }) => {
          return <li key={id}>{text}</li>;
        })}
      </div>
    );
  }

  function showEditing() {
    return (
      <div className="showResult">
        <h2>
          {index + 1}.{" "}
          <input
            id={questionAnswer.id}
            value={question}
            onChange={e => handleQuestionEdit(e)}
            className="question-edit"
          />
        </h2>
        <i
          className="fas fa-check define-correct"
          onClick={() => useEditing(false)}
        ></i>
        <i
          onClick={() => deleteQuestion(questionAnswer)}
          className="fas fa-times define-cancel"
        ></i>
        {answers.map(({ text, id }) => {
          return (
            <li key={id}>
              <input
                value={text}
                onChange={e => handleAnswerEdit(e, questionAnswer.id)}
                id={id}
              />
            </li>
          );
        })}
      </div>
    );
  }
  return <div className="result">
  

    {editing ? showEditing() : showResult()}
    </div>;
};

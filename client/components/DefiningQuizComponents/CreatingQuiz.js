import React from "react";

export function CreatingQuiz(props) {
  const {
    questionAnswers,
    questionInput,
    renderAnswers,
    addAnswer,
    handleQuestion,
    createQuestionAnswer,
    createQuiz
  } = props;
  return (
    <div className="main-box">
      <div className="define-col">
        <div className="define-question">
          <p>Define your question:</p>
          <input
            onChange={e => handleQuestion(e)}
            value={questionInput}
          ></input>
          <p className="define-question-num">{questionAnswers.length + 1}/10</p>
        </div>
        <div className="answers"> Define answers: {renderAnswers}</div>
      </div>
      <div className="icons-col">
        {questionAnswers.length < 9 ? (
          <span
            onClick={() => createQuestionAnswer()}
            className="next-question define-button"
          >
            <i className="fas fa-arrow-right"></i>
            <a>Next Question</a>
          </span>
        ) : null}
        <span
          onClick={() => addAnswer()}
          className="define-button add-answers "
        >
          <i className="fas fa-plus"></i>
          <a>Add Answers</a>
        </span>
        <span
          onClick={() => createQuiz()}
          className="create-quiz define-button"
        >
          <i className="fas fa-plus-circle"></i>
          <a>Create Quiz</a>
        </span>
      </div>
    </div>
  );
}

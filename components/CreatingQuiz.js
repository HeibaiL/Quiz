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
    <div>
      <span onClick={() => addAnswer()} className="define-button add-answers ">
        <i className="fas fa-plus"></i>
        <a>Add Answers</a>
      </span>
      {questionAnswers.length < 9 ? (
        <span
          onClick={() => createQuestionAnswer()}
          className="next-question define-button"
        >
          <i className="fas fa-arrow-right"></i>
          <a>Next Question</a>
        </span>
      ) : null}
      <span onClick={() => createQuiz()} className="create-quiz define-button">
        <i className="fas fa-plus-circle"></i>
        <a>Create Quiz</a>
      </span>
      <div className="define-quiz">
        <div className="define-question">
          <input
            onChange={e => handleQuestion(e)}
            value={questionInput}
          ></input>
          <p>Define your question</p>
          <p className="define-question-num">{questionAnswers.length + 1}/10</p>
        </div>
        <div className="answers">{renderAnswers}</div>
      </div>
    </div>
  );
}

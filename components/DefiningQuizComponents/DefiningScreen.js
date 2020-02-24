import React from "react";

import { ResultsScreen } from "./ResultsScreen";
import { CreatingQuiz } from "./CreatingQuiz";

export function DefiningScreen(props) {
  const {
    creatingQuiz,
    emptyFieldErr,
    questionInput,
    questionAnswers,
    renderAnswers,
    addAnswer,
    handleQuestion,
    createQuestionAnswer,
    createQuiz,
    handleTitleInput,
    title,
    endCreatingQuiz,
    handleAnswerEdit,
    handleQuestionEdit,
    deleteQuestion
  } = props;
  return (
    <div>
      {
        <p
          className="empty-error"
          style={
            emptyFieldErr ? { opacity: 0.8, height: "22px" } : { opacity: 0 }
          }
        >
          {emptyFieldErr}
        </p>
      }
      <h1> Define new quiz</h1>
      {creatingQuiz ? (
        <CreatingQuiz
          questionInput={questionInput}
          questionAnswers={questionAnswers}
          renderAnswers={renderAnswers}
          addAnswer={addAnswer}
          handleQuestion={handleQuestion}
          createQuestionAnswer={createQuestionAnswer}
          createQuiz={createQuiz}
        />
      ) : (
        <div className="render-results">
          <input
            className="define-title"
            placeholder="Enter quiz title"
            onChange={e => handleTitleInput(e)}
            value={title}
          />
          <div
            className="end-creating define-button "
            onClick={() => endCreatingQuiz()}
          >
            <i className="far fa-dot-circle"></i> End Creating Quiz
          </div>
          {questionAnswers.map((questionAnswer, index) => {
            return (
              <ResultsScreen
                handleAnswerEdit={handleAnswerEdit}
                handleQuestionEdit={handleQuestionEdit}
                questionAnswer={questionAnswer}
                deleteQuestion={deleteQuestion}
                index={index}
                key={questionAnswer.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

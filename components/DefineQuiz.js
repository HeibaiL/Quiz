import React, { useEffect, useState, useMemo } from "react";
import uuid from "react-uuid";

import { DefineAnswer } from "./DefineAnswer";
import { Results } from "./Results";

export const DefineQuiz = () => {
  const [creatingQuiz, useCreatingQuiz] = useState(false);
  const [questionInput, useQuestion] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [questionAnswers, useQuestionAnswers] = useState([]);
  console.log(questionAnswers)

  useEffect(() => {
    loadAnswers();
  }, []);

  function handleQuestion(e) {
    const { value } = e.target;
    useQuestion(value);
  }
  function handleQuestionEdit(e) {
    const { id, value } = e.target;
    const newArr = questionAnswers.map(quiz => {
      return quiz.id === id ? { ...quiz, question: value } : quiz;
    });
    useQuestionAnswers(newArr);
  }

  function handleAnswerEdit(e, quizId) {
    const { id, value } = e.target;
    const questionAnswer = questionAnswers.filter(quiz => quiz.id === quizId)[0];
    const newAnswers = questionAnswer.answers.map(answer=>{
         return answer.id===id?{...answer, text:value}:answer
    })
    const newArr = questionAnswers.map(quiz => {
      return quiz.id === quizId ? { ...quiz, answers:newAnswers } : quiz;
    });

    useQuestionAnswers(newArr);
  }

  function createQuiz() {
    createQuestionAnswer();
    useCreatingQuiz(true);
  }
  //start with 2 answers
  function loadAnswers() {
    setAllAnswers(
      [].concat({ id: uuid(), text: "" }, { id: uuid(), text: "" })
    );
  }

  function createQuestionAnswer() {
    useQuestionAnswers(
      questionAnswers.concat({
        id: uuid(),
        question: questionInput,
        answers: allAnswers
      })
    );
    useQuestion("");
    loadAnswers();
  }

  function deleteQuestion(id) {
    const updatedArr = [...questionAnswers];
    updatedArr.map((answer, index) => {
      if (id === answer.id) {
        updatedArr.splice(index, 1);
      }
    });
    useQuestionAnswers(updatedArr);
  }

  function handleAnswerInput(e) {
    const { id, value } = e.target;
    const newArr = allAnswers.map(answer => {
      return answer.id === id ? { ...answer, text: value } : answer;
    });
    setAllAnswers(newArr);
  }

  function renderResults() {
    return (
      <div className="render-results">
        {questionAnswers.map((questionAnswer, index) => {
          return (
            <Results
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
    );
  }
  function renderDefining() {
    return (
      <div>
        <span
          onClick={() =>
            setAllAnswers(allAnswers.concat({ id: uuid(), text: "" }))
          }
          className="define-button add-answers "
        >
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
        <span
          onClick={() => createQuiz()}
          className="create-quiz define-button"
        >
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
            <p className="define-question-num">
              {questionAnswers.length + 1}/10
            </p>
          </div>
          <div className="answers">{renderAnswers}</div>
        </div>
      </div>
    );
  }

  const renderAnswers = useMemo(
    () =>
      allAnswers.map(answer => {
        return (
          <DefineAnswer
            handleAnswerInput={handleAnswerInput}
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
      {creatingQuiz ? renderResults() : renderDefining()}
    </div>
  );
};

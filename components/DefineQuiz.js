import React, { useEffect, useState, useMemo } from "react";
import uuid from "react-uuid";

import { DefineAnswer } from "./DefineAnswer";
import { Results } from "./Results";
import { CreatingQuiz } from "./CreatingQuiz";
import { json } from "body-parser";

export const DefineQuiz = () => {
  const [emptyFieldErr, useEmptyFieldErr] = useState("");
  const [title, useTitle] = useState("");
  const [creatingQuiz, useCreatingQuiz] = useState(false);
  const [questionInput, useQuestion] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [questionAnswers, useQuestionAnswers] = useState([]);

  useEffect(() => {
    loadTwoAnswers();
  }, []);
  function showEmptyFieldError(error) {
    useEmptyFieldErr(error);
    setTimeout(() => useEmptyFieldErr(""), 3000);
  };
  
  function endCreatingQuiz() {
    fetch("http://localhost:4000/definequiz", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ title, data: [...questionAnswers] })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
  function handleTitleInput(e) {
    const { value } = e.target;
    useTitle(value);
  }
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
    const questionAnswer = questionAnswers.filter(
      quiz => quiz.id === quizId
    )[0];
    const newAnswers = questionAnswer.answers.map(answer => {
      return answer.id === id ? { ...answer, text: value } : answer;
    });
    const newArr = questionAnswers.map(quiz => {
      return quiz.id === quizId ? { ...quiz, answers: newAnswers } : quiz;
    });

    useQuestionAnswers(newArr);
  }

  function createQuiz() {
    const error = createQuestionAnswer();
    if (error) return showEmptyFieldError(error.message);

    useCreatingQuiz(true);
  }
  //start with 2 answers
  function loadTwoAnswers() {
    setAllAnswers(
      [].concat({ id: uuid(), text: "" }, { id: uuid(), text: "" })
    );
  }

  function createQuestionAnswer() {
    try {
      if (!questionInput.trim())
        throw new Error("Question input field is empty");
      for (let answer of allAnswers) {
        if (!answer.text) throw new Error("Answers fields are empty");
      }
    } catch (error) {
      showEmptyFieldError(error.message);
      return error;
    }

    useQuestionAnswers(
      questionAnswers.concat({
        id: uuid(),
        question: questionInput,
        answers: allAnswers
      })
    );
    useQuestion("");
    loadTwoAnswers();
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

  function addAnswer() {
    setAllAnswers(allAnswers.concat({ id: uuid(), text: "" }));
  }

  function handleAnswerInput(e) {
    const { id, value } = e.target;
    const newArr = allAnswers.map(answer => {
      return answer.id === id ? { ...answer, text: value } : answer;
    });
    setAllAnswers(newArr);
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
      {
        <p
          className="empty-error"
          style={
            emptyFieldErr ? { opacity: 0.8, height:"22px" } : { opacity: 0}
          }
        >
          {emptyFieldErr}
        </p>
      }
      <h1> Define new quiz</h1>

      {!creatingQuiz ? (
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
      )}
    </div>
  );
};

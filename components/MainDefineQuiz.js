import React, { useEffect, useState, useMemo } from "react";
import uuid from "react-uuid";

import { DefineAnswer } from "./DefiningQuizComponents/DefineAnswer";
import { DefiningScreen } from "./DefiningQuizComponents/DefiningScreen";

export const MainDefineQuiz = () => {
  const [emptyFieldErr, useEmptyFieldErr] = useState("");
  const [title, useTitle] = useState("");
  const [creatingQuiz, useCreatingQuiz] = useState(true);
  const [questionInput, useQuestion] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [questionAnswers, useQuestionAnswers] = useState([]);
  const [completedScreen, useCompletedScreen] = useState(false);

  useEffect(() => {
    loadTwoAnswers();
  }, []);
  function showEmptyFieldError(error) {
    if (emptyFieldErr) return;
    useEmptyFieldErr(error);
    setTimeout(() => useEmptyFieldErr(""), 3000);
  }

  function endCreatingQuiz() {
    if (!title) return showEmptyFieldError("Title is required");

    fetch("http://localhost:4000/definequiz", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ title, data: questionAnswers })
    })
      .then(res => res.json())
      .then(() => useCompletedScreen(true))
      .catch(err => console.log("Error while saving", err));
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

    useCreatingQuiz(false);
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
      {!completedScreen ? (
        <DefiningScreen
          creatingQuiz={creatingQuiz}
          emptyFieldErr={emptyFieldErr}
          questionInput={questionInput}
          questionAnswers={questionAnswers}
          renderAnswers={renderAnswers}
          addAnswer={addAnswer}
          handleQuestion={handleQuestion}
          createQuestionAnswer={createQuestionAnswer}
          createQuiz={createQuiz}
          handleTitleInput={handleTitleInput}
          title={title}
          endCreatingQuiz={endCreatingQuiz}
          handleAnswerEdit={handleAnswerEdit}
          handleQuestionEdit={handleQuestionEdit}
          deleteQuestion={deleteQuestion}
        />
      ) : (
        <div className="completed defining">
          <span>
            <i className="fas fa-check-circle"></i> Quiz was successfully
            created
          </span>
        </div>
      )}
    </div>
  );
};

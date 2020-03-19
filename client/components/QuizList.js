import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectQuiz } from "../store/actions";

export const QuizList = () => {
  const dispatch = useDispatch();
  
  const { availableQuizes:{quizes} } = useSelector(state => {
    return {
      selectedQuiz: state.selectedQuiz,
      availableQuizes: state.availableQuizes
    };
  });

  function chooseQuiz(id) {
    const index = quizes.findIndex(quiz => quiz._id === id);
    const chosenQuiz = quizes[index];
    dispatch(selectQuiz(chosenQuiz));
  }

  return (
    <div className="quizList">
      <ul className="list">
        {quizes.map(quiz => (
          <li key={quiz._id} onClick={() => chooseQuiz(quiz._id)}>
            <Link to="/">
              <p>{quiz.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

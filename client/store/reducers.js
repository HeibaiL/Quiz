import { combineReducers } from "redux";
import { v4 as createId } from "uuid";

import {
  SAVE_ANSWER,
  DELETE_ANSWER,
  SET_QUIZ,
  SELECT_QUIZ,
  SAVE_QUIZ,
  SUBMIT_ANSWERS,
  ADD_ANSWER,
  ADD_DATA
} from "./actions";

let defaultState = { quizes: [] };
let defaultDefineState = {
  data: Date.now(),
  id: createId(),
  user: "user",
  data: {}
};

const selectedQuiz = (state = {}, action) => {
  switch (action.type) {
    case SELECT_QUIZ:
      return action.payload;
    default:
      return state;
  }
};

const sumbitReducer = (state = [], action) => {
  const updatedArr = state.map(quiz =>
    quiz.title === action.title
      ? { ...quiz, usersAnswered: quiz.usersAnswered.concat(action.payload) }
      : quiz
  );
  switch (action.type) {
    case SUBMIT_ANSWERS:
      return updatedArr;
    default:
      return state;
  }
};
const availableQuizes = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_ANSWER:
      return {
        ...state,
        answers: state.answers.concat(action.payload)
      };
    case DELETE_ANSWER:
      return {
        ...state,
        answers: state.answers.pop()
      };
    case SET_QUIZ:
      return { ...state, quizes: action.payload };
    case SUBMIT_ANSWERS:
      return {
        ...state,
        quizes: sumbitReducer(state.quizes, action)
      };
    default:
      return state;
    case SAVE_QUIZ:
      return { ...state, quizes: state.quizes.concat(action.payload) };
  }
};

const questions = (state = {}, action) =>{
  switch(action.type){
    case ADD_DATA:

      return {
        ...state,
        [action.id]:action.payload
      }
    default:
      return state
  }
}
const defineReducer = (state = defaultDefineState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data:questions(state.data, action)
      }
    case ADD_ANSWER:
      return {
        ...state,

      };
      default: 
      return state
  }
};
export const rootReducer = combineReducers({
  selectedQuiz,
  availableQuizes,
  defineReducer
});

import { SAVE_ANSWER, DELETE_ANSWER, SET_QUIZ } from "./actions";
import { combineReducers } from "redux";

let defaultState = { quizes: [], answers: [] };

const answerReducer = (state = defaultState, action) => {
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
      return { ...state, 
        quizes: action.payload };
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  appAnswers: answerReducer
});

export const SAVE_ANSWER = "SAVE_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";
export const SET_QUIZ = "SET_QUIZ";
export const SELECT_QUIZ = "SELECT_QUIZ";
export const SAVE_QUIZ = "SAVE_QUIZ";
export const SUBMIT_ANSWERS = "SUBMIT_ANSWERS";
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_DATA = "ADD_DATA";


export function saveAnswer(answer) {
  return { type: SAVE_ANSWER, payload: answer };
}
export function setQuiz(quiz) {
  return { type: SET_QUIZ, payload: quiz };
}
export function selectQuiz(quiz) {
  return { type: SELECT_QUIZ, payload: quiz };
}
export function saveQuiz(quiz) {
  return { type: SAVE_QUIZ, payload: quiz };
}
export function submitAnswers(title, answers) {
  return { type: SUBMIT_ANSWERS, title, payload: answers };
}
export function addAnswer(answer) {
  return { type: ADD_ANSWER, payload: answer };
}

export function addData(question, id) {
  return { type: ADD_DATA, payload: question, id};
}

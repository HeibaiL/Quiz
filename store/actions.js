export const SAVE_ANSWER = "SAVE_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";
export const SET_QUIZ = "SET_QUIZ"

export function saveAnswer(answer) {
  return { type: SAVE_ANSWER, payload: answer };
}
export function delAnswer(answer) {
  return { type: DELETE_ANSWER, payload: null };
}
export function setQuiz(quiz) {
  return { type: SET_QUIZ, payload: quiz };
}
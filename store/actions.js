export const SAVE_ANSWER = "SAVE_ANSWER";
export function saveAnswer(answer) {
  return { type: SAVE_ANSWER, payload: answer };
}

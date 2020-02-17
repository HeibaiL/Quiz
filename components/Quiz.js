import React, { useState } from "react";
import { connect } from "react-redux";
import { saveAnswer } from "../store/actions";

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = {
  saveAnswer
};

function Quiz(props) {
  const {
    quiz,
    quiz: { answers },
    saveAnswer
  } = props;
  const [stateAnswer, useAnswer] = useState("");
  const chosenStyle = { background: "#343240" };

  let id = 0;
  function getAnswer(answer) {
    useAnswer(answer);
    const fullAnswer = { question: quiz.question, answer };
    saveAnswer(fullAnswer);
  }
  return (
    <div className="quiz">
      <h1>{quiz.question}</h1>
      <ul className="answers">
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

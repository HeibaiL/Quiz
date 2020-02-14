import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import  {saveAnswer} from "../store/actions"

const mapStateToProps = state =>(
  {
    ...state
  }
)
const mapDispatchToProps = {
  saveAnswer
}
 function Quiz(props) {
   const {quiz} = props;
   console.log(props)
  const [stateAnswer, useAnswer] = useState("");
  let id = 0;

  const chosenStyle = { background: "#343240" };
  const getAnswer = answer => {
    localStorage.setItem("answers", JSON.stringify(answer));
    return useAnswer(answer)
  };

  return (
    <div className="quiz">
      <h1>{quiz.question}</h1>
      <ul className="answers">
        {quiz.answers.map(answer => {
          id += 1;
          return (
            <li
              key={id}
              style={stateAnswer == answer ? chosenStyle : null}
              onClick={() => getAnswer(answer)}
            >
              {answer}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(Quiz)
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Scores.module.css";
function Scores(props) {
  let location = useLocation();
  let navigate = useNavigate();

  const [showAns, setShowAns] = useState(false);
  var score = location.state.scores;

  var questions = location.state.questions;
  var list = location.state.list;

  var success = (score / questions) * 100;

  function handleStartAgain() {
    navigate("/");
  }
  function handleSeeAnswers() {
    console.log(list);
    setShowAns(!showAns);
    if (showAns) {
      document.getElementById("showBtn").innerHTML = "Show answers";
    } else {
      document.getElementById("showBtn").innerHTML = "Hide answers";
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.sentence}>Your success rate is : {success} %</div>
      <div className={classes.sentence}>Your score is : {score}</div>
      <button className={classes.btn} onClick={handleStartAgain}>
        Start again
      </button>
      <button id="showBtn" className={classes.btn} onClick={handleSeeAnswers}>
        See answers
      </button>

      {showAns === true ? (
        <div>
          <p className={classes.title}>Answers :</p>
          <div className={classes.answers}>
            {list.map((item, index) => {
              return (
                <div key={index} className={classes.ans}>
                  {index + 1}. {item.question} <p>{item.correctAnswer}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Scores;

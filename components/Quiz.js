import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Quiz.module.css";
function Quiz() {
  let location = useLocation();
  let navigate = useNavigate();

  const [quizData, setQuizData] = useState({}); //array consisting of question and answers
  const [score, setScore] = useState(0); //to keep track of the score
  const [qAndAList, setqAndAList] = useState({});

  var ques = [];
  let quiz = [];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  //getting the data from form on Start page
  let category = location.state.category;
  let questions = location.state.questions;
  let difficulty = location.state.difficulty;

  let url =
    "https://the-trivia-api.com/api/questions?categories=" +
    category +
    "&limit=" +
    questions +
    "&difficulty=" +
    difficulty;

  //helper function to shuffle the answers so they are not on the same position every question
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //set the array filled with questions and answers
  function setQuestions(data) {
    if (data[0] !== undefined) {
      for (var i = 0; i < questions; i++) {
        quiz.push({
          answers: [
            { answer: data[i].correctAnswer, isCorrect: true },
            { answer: data[i].incorrectAnswers[0], isCorrect: false },
            { answer: data[i].incorrectAnswers[1], isCorrect: false },
            { answer: data[i].incorrectAnswers[2], isCorrect: false },
          ],
          question: data[i].question,
        });
        shuffle(quiz[i].answers); //shuffle the answers
        ques.push({
          question: data[i].question,
          correctAnswer: data[i].correctAnswer,
        });
      }
      setQuizData(quiz);
      setqAndAList(ques);
    }
  }

  function navigateToScore() {
    if (currentQuestion < questions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/scores", {
        state: {
          scores: score,
          questions: currentQuestion + 1,
          list: qAndAList,
        },
      });
    }
  }
  //handle the 'Next' button click
  function handleNextBtn() {
    navigateToScore();
  }

  function check(index) {
    if (quizData[currentQuestion].answers[index].isCorrect === true) {
      var s = score + 1;
      setScore(s);
    }
  }
  //when the answer is clicked, we check if it is correct, update the score and go to the next question
  function handleAnswerBtn(e, index) {
    check(index);

    navigateToScore();
  }

  useEffect(() => {
    //fetch data from API
    async function getData() {
      await axios.get(url).then((result) => {
        setQuestions(result.data);
      });
    }
    getData();
  }, []);

  return (
    <div>
      {quizData[0] !== undefined && (
        <div className={classes.container}>
          <div>
            Question {currentQuestion + 1} / {questions}
          </div>
          <div className={classes.question}>
            {quizData[currentQuestion].question}
          </div>
          <div>
            {quizData[currentQuestion].answers.map((answer, index) => {
              return (
                <button
                  className={classes.answers}
                  key={index}
                  id={index}
                  onClick={(e) => {
                    handleAnswerBtn(e, index);
                  }}
                >
                  {answer.answer}
                </button>
              );
            })}
          </div>
          <button className={classes.next} onClick={handleNextBtn}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;

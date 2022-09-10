import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import classes from "./Start.module.css";
function Start() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState(0);

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    //after submitting, go to the quiz
    navigate("/quiz", {
      state: {
        category: category,
        difficulty: difficulty,
        questions: questions,
      },
    });
  };
  return (
    <Container className={classes.container}>
      <div className={classes.main}>
        <p className={classes.title}>Welcome, quizophile!</p>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Form.Group className={classes.group}>
            <label>Select the category</label> <br />
            <Form.Control
              required
              className={classes.input}
              as="select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                console.log(category);
              }}
            >
              <option>Category</option>
              <option value="arts_and_literature">Arts &#38; Literature</option>
              <option value="film_and_tv">Film &#38; TV</option>
              <option value="food_and_drink">Food &#38; Drink</option>
              <option value="general_knowledge">General Knowledge</option>
              <option value="geography">Geography</option>
              <option value="history">History</option>
              <option value="music">Music</option>
              <option value="science">Science</option>
              <option value="society_and_culture">Society &#38; Culture</option>
              <option value="sportss_and_leisure">Sports &#38; Leisure</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className={classes.group}>
            <label>Select the difficulty</label> <br />
            <Form.Control
              required
              className={classes.input}
              as="select"
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
                console.log(difficulty);
              }}
            >
              <option>Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className={classes.group}>
            <label>The number of questions you would like (0-20)</label> <br />
            <Form.Control
              required
              className={classes.input}
              type="number"
              value={questions}
              onChange={(e) => {
                setQuestions(e.target.value);
                console.log(questions);
              }}
            ></Form.Control>
          </Form.Group>
        </form>
      </div>
    </Container>
  );
}

export default Start;

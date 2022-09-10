import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Quiz from "./components/Quiz";
import Scores from "./pages/Scores";
import "./App.css";

function App() {
  return (
    <div className="app">
      <a href="/" id="home">
        Quiz
      </a>
      <Routes>
        <Route path="/" exact element={<Start />} />
        <Route path="/quiz" exact element={<Quiz />} />
        <Route path="/scores" exact element={<Scores />} />
      </Routes>
    </div>
  );
}

export default App;

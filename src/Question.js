import React from "react";
import { useState } from "react";
import parse from "html-react-parser";

export default function Question({ question, renderNext, questionLength }) {
  let allAnswers = [];
  const [counter, setCounter] = useState(1);
  const [score, setScore] = useState(0);

  function shuffle(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  function checkAnswer(id) {
    if (allAnswers[id].isCorrect) {
      alert("Correct");
      setScore(score + 1);
    } else {
      alert("You miss that");
    }
    if (counter === questionLength) {
      alert(`Congratulations, your score is ${score} `);
      renderNext();
      setCounter(0);
      setScore(0);
    } else {
      renderNext();
      setCounter(counter + 1);
    }
  }
  allAnswers = question.incorrect_answers.map((item) => {
    return {
      answer: item,
      isCorrect: false,
    };
  });
  allAnswers.push({
    answer: question.correct_answer,
    isCorrect: true,
  });
  allAnswers = shuffle(allAnswers);
  console.log(allAnswers);
  return (
    <div className="container">
      <h1 key={"qtitle"}>{parse(question.question)}</h1>
      <ul key={"questionList"} className="answerContainer">
        {allAnswers.map((answer, index) => {
          return (
            <button
              key={index}
              className="answer"
              onClick={() => checkAnswer(index)}
            >
              {parse(answer.answer)}
            </button>
          );
        })}
      </ul>
      <p className="counter" key={"counter"}>
        {counter}/{questionLength}
      </p>
    </div>
  );
}

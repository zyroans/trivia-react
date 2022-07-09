import React from "react";

export default function Question({ question, renderNext }) {
  let allAnswers = [];
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
    } else {
      alert("You miss that");
    }
    renderNext();
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

  return (
    <div className="container">
      <h1 key={"qtitle"}>{question.question}</h1>
      <ul key={"questionList"} className="answerContainer">
        {allAnswers.map((answer, index) => {
          return (
            <button
              key={index}
              className="answer"
              onClick={() => checkAnswer(index)}
            >
              {answer.answer}
            </button>
          );
        })}
      </ul>
      <p className="counter" key={"counter"}></p>
    </div>
  );
}

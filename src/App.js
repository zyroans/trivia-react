import { useState, useEffect } from "react";
import "./App.css";
import CategoryList from "./CategoryList";
import Question from "./Question";

function App() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  function renderNext() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setQuestions([]);
      setIndex(0);
    }
  }

  async function getQuestionList(id) {
    const questionsURL = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${id}`
    );
    const questionList = await questionsURL.json();
    setQuestions(questionList.results);
    console.log(questions);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const URLData = await fetch("https://opentdb.com/api_category.php");
    const categoriesList = await URLData.json();
    console.log(categoriesList);
    setCategories(categoriesList.trivia_categories);
  }

  return (
    <>
      {questions.length === 0 ? (
        <CategoryList
          categories={categories}
          getQuestionList={getQuestionList}
        />
      ) : (
        <Question question={questions[index]} renderNext={renderNext} />
      )}
    </>
  );
}

export default App;

import React from "react";

export default function CategoryList({ categories, getQuestionList }) {
  return (
    <div className="container">
      <h1>Welcome to Trivia</h1>
      {categories.map((category) => (
        <button
          className="button"
          key={category.id}
          onClick={() => getQuestionList(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

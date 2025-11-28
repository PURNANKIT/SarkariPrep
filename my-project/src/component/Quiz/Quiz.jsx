import React, { useState } from "react";
import "./Quiz.css"; // Optional CSS

const quizData = [
  {
    question: "भारत की राजधानी क्या है?",
    options: ["मुंबई", "दिल्ली", "कोलकाता", "चेन्नई"],
    answer: "दिल्ली",
  },
  {
    question: "भारत का राष्ट्रध्वज कितने रंग का है?",
    options: ["2", "3", "4", "1"],
    answer: "3",
  },
  {
    question: "UP Police की स्थापना कब हुई थी?",
    options: ["1850", "1860", "1870", "1880"],
    answer: "1860",
  },
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    if (option === quizData[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="quiz-page">
        <h2>🎉 Quiz Complete!</h2>
        <p>
          Your Score: {score} / {quizData.length}
        </p>
      </div>
    );
  }

  const currentQ = quizData[currentIndex];

  return (
    <div className="quiz-page">
      <h2>Question {currentIndex + 1} of {quizData.length}</h2>
      <p className="quiz-question">{currentQ.question}</p>
      <div className="quiz-options">
        {currentQ.options.map((opt, i) => (
          <button key={i} onClick={() => handleOptionClick(opt)} className="quiz-btn">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

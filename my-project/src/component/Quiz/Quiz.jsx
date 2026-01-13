import React, { useState } from "react";
import "./Quiz.css";
import { useUser } from "../../component/context/UserContext"; // ✅ Language context

// ✅ ✅ ✅ HINDI QUIZ DATA
const quizDataHindi = [
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
  {
    question: "SBI की स्थापना कब हुई थी?",
    options: ["1850", "1955", "1870", "1880"],
    answer: "1955",
  },
  {
    question: "भारत का पहला उपग्रह कौन सा था?",
    options: ["आर्यभट्ट", "भास्कर", "इंसैट", "मंगलयान"],
    answer: "आर्यभट्ट",
  },
];

// ✅ ✅ ✅ ENGLISH QUIZ DATA
const quizDataEnglish = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi",
  },
  {
    question: "How many colors are there in the Indian flag?",
    options: ["2", "3", "4", "1"],
    answer: "3",
  },
  {
    question: "What is the full form of RAM?",
    options: [
      "Random Access Memory",
      "Read Access Memory",
      "Run Access Memory",
      "Real Access Memory",
    ],
    answer: "Random Access Memory",
  },
  {
    question: "Distance between Earth and Sun is approximately?",
    options: [
      "149.6 million km",
      "93 million miles",
      "150 million km",
      "100 million miles",
    ],
    answer: "149.6 million km",
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Bill Gates", "Steve Jobs", "Larry Page", "Mark Zuckerberg"],
    answer: "Bill Gates",
  },
];

const Quiz = () => {
  const { language } = useUser(); // ✅ Language from Navbar
  const quizData = language === "hi" ? quizDataHindi : quizDataEnglish;

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
      <h2>
        Question {currentIndex + 1} of {quizData.length}
      </h2>

      <p className="quiz-question">{currentQ.question}</p>

      <div className="quiz-options">
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(opt)}
            className="quiz-btn"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

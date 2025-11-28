import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [canStart, setCanStart] = useState(false);
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const now = new Date();
    const quizTime = new Date();
    quizTime.setHours(20, 0, 0, 0); // 8 PM

    if (now > quizTime) quizTime.setDate(quizTime.getDate() + 1);

    const diff = quizTime - now;

    if (diff <= 0) {
      setCanStart(true); // Quiz is now unlocked
      return "00h 00m 00s";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleJoinQuiz = () => {
    if (canStart) {
      navigate("/quiz");
    } else {
      alert("⏳ Quiz abhi start nahi hua baby... countdown khatam hone ka wait karo ❤️");
    }
  };

  return (
    <section className="header">
      <div className="header-overlay">
        <div className="header-content">
          <h1 className="header-title">📰 Daily Current Affairs Quiz</h1>

          <p className="header-subtitle">
            Stay updated with the latest happenings!  
            Daily quiz starts every night at <span>8:00 PM</span>.
          </p>

          <div className="quiz-stats">
            <div className="stat">
              <h3>{timeLeft}</h3>
              <p>Next Quiz Starts In</p>
            </div>
          </div>

          <button 
            className={`btn join ${canStart ? "active" : "disabled"}`} 
            onClick={handleJoinQuiz}
          >
            {canStart ? "Start Quiz" : "Join Quiz"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;

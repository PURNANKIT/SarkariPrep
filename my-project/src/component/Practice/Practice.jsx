// src/components/Practice/Practice.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./Practice.css";

const TOTAL_MINUTES = 60;
const TOTAL_SECONDS = TOTAL_MINUTES * 60;
const API_BASE = "http://localhost:5000"; // backend URL

const Practice = () => {
  const navigate = useNavigate();
  const { user, language } = useUser ? useUser() : { user: null, language: "en" };
  const lang = language || "en";

  const jobKey = useMemo(() => {
    if (!user) return null;
    const raw = user.job_preparation || user.job || user.selectedJob || user.preparation || "";
    const lower = String(raw).toLowerCase();
    if (lower.includes("upsc")) return "UPSC";
    if (lower.includes("ssc")) return "SSC";
    if (lower.includes("bank")) return "Bank";
    if (lower.includes("rail")) return "Railway";
    if (lower.includes("defenc") || lower.includes("defense")) return "Defence";
    if (lower.includes("police")) return "Police";
    if (lower.includes("state")) return "State Exam";
    return raw;
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [fetchError, setFetchError] = useState(null);

  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const timerRef = useRef(null);

  const [curIndex, setCurIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch questions
  useEffect(() => {
    if (!jobKey) return;
    setLoading(true);
    fetch(`${API_BASE}/api/practice?job=${encodeURIComponent(jobKey)}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(Array.isArray(data.questions) ? data.questions : []);
        setTitle(data.title || jobKey + " Practice");
        setLoading(false);
      })
      .catch(err => {
        setFetchError(err.message || "Failed to fetch questions");
        setLoading(false);
      });
  }, [jobKey]);

  // Timer
  useEffect(() => {
    if (!started || submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, submitted]);

  const formatTime = secs => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getQText = q => {
    if (!q) return "";
    return lang === "hi" ? (q.q_hi || q.q_en || q.q) : (q.q_en || q.q || q.q_hi);
  };

  const getOptions = q => {
    if (!q) return [];
    return lang === "hi" ? (q.options_hi || q.options_en || q.options || []) : (q.options_en || q.options || q.options_hi || []);
  };

  const choose = (id, idx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [id]: idx }));
  };

  const prev = () => setCurIndex(c => Math.max(0, c - 1));
  const next = () => setCurIndex(c => Math.min(questions.length - 1, c + 1));

  const handleSubmit = () => {
    if (submitted) return;
    let s = 0;
    questions.forEach(q => {
      const sel = answers[q.id];
      if (sel === undefined || sel === null) return;
      if (typeof q.answer === "number") {
        if (sel === q.answer) s++;
      } else {
        const opts = getOptions(q);
        if (opts[sel] && opts[sel].toLowerCase() === String(q.answer).toLowerCase()) s++;
      }
    });
    setScore(s);
    setSubmitted(true);
    clearInterval(timerRef.current);
  };

  const handleStart = () => {
    setAnswers({});
    setCurIndex(0);
    setScore(0);
    setSubmitted(false);
    setStarted(true);
    setTimeLeft(TOTAL_SECONDS);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurIndex(0);
    setScore(0);
    setSubmitted(false);
    setStarted(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  // Render guards
  if (!user) return <div>Please login to access practice</div>;
  if (!jobKey) return <div>No job selected</div>;
  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;
  if (!questions.length) return <div>No practice questions available</div>;

  const curQ = questions[curIndex];
  const opts = getOptions(curQ);
  const selIndex = answers[curQ.id];

  return (
    <div className="practice-wrap">
      <h2 className="practice-title">{title}</h2>

      <div className="time-question">
        <span className="timer">Time left: {formatTime(timeLeft)}</span>
        <span className="question-number">Question {curIndex + 1} / {questions.length}</span>
      </div>

      {!started ? (
        <button className="start-button" onClick={handleStart}>Start Practice</button>
      ) : !submitted ? (
        <div>
          <div className="question-text">{getQText(curQ)}</div>
          <ul className="options-list">
            {opts.map((opt, i) => (
              <li
                key={i}
                className={selIndex === i ? "selected" : ""}
                onClick={() => choose(curQ.id, i)}
              >
                {opt}
              </li>
            ))}
          </ul>

          <div className="quiz-actions">
            <div className="left-buttons">
              <button onClick={prev} disabled={curIndex === 0}>Prev</button>
              <button onClick={next} disabled={curIndex + 1 >= questions.length}>Next</button>
            </div>
            <button className="finish-btn" onClick={handleSubmit}>Finish</button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="score">Your Score: {score} / {questions.length}</h3>

          <div className="review-section">
            <h4>Review Answers</h4>
            <ul className="review-list">
              {questions.map((q, i) => {
                const sel = answers[q.id];
                const correctAnswer = typeof q.answer === "number" ? q.answer : getOptions(q).findIndex(opt => opt.toLowerCase() === String(q.answer).toLowerCase());
                const isCorrect = sel === correctAnswer;
                return (
                  <li key={i} className={isCorrect ? "correct" : "wrong"}>
                    <div className="review-question">{getQText(q)}</div>
                    <div className="review-answers">Your answer: {sel !== undefined ? getOptions(q)[sel] : "Not answered"}</div>
                    <div className="review-answers">Correct answer: {getOptions(q)[correctAnswer]}</div>
                  </li>
                );
              })}
            </ul>
          </div>

          <button className="start-button" onClick={handleRestart}>Start New Session</button>
        </div>
      )}
    </div>
  );
};

export default Practice;

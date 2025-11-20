// component/Quiz/QuizPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobInfo from "../JobInfo/jobInfo";
import { useUser } from "../context/UserContext";
import "./QuizPage.css";

/* slug -> broad key mapping (keeps old behavior) */
const slugToKey = {
  ssc: "SSC",
  upsc: "UPSC",
  railway: "Railway",
  bank: "Bank",
  defence: "Defence",
  police: "Police",
  "state-exam": "State Exam",
  other: "Other",
};

const ATTEMPT_KEY = (routeKey) => `quiz_attempt_${routeKey}`;
const RESULT_KEY = (routeKey) => `quiz_result_${routeKey}`;
const RETAKE_MS = 30 * 60 * 1000; // 30 minutes in ms
const TOTAL_QUESTIONS = 10;

// simple random sample (unique) from array
const sampleQuestions = (arr, n) => {
  if (!Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
};

const formatTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function QuizPage() {
  const { job: jobSlugParam } = useParams(); // from route /quiz/:job
  const navigate = useNavigate();
  const { user, language } = useUser();
  const lang = language || "en";

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]); // active question set for this attempt
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState({}); // idx -> selected index
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const cooldownRef = useRef(null);

  // normalize incoming slug -> try to derive exact key and storage key
  // Accept forms like: "ssc", "ssc-gd", "ssc_gd", "ssc_gd-2025" etc.
  const rawRoute = String(jobSlugParam || "").trim();
  // normalizedRouteKey: replace hyphens with underscores and lowercase (used for localStorage keys)
  const normalizedRouteKey = rawRoute.replace(/-/g, "_").toLowerCase();
  // attempt to find exact jobInfo key:
  // 1) exact normalizedRouteKey (ssc_gd)
  // 2) jobInfo keys that match when underscores removed (defensive)
  // 3) fallback to slugToKey mapping (broad)
  let infoKey = null;
  if (normalizedRouteKey && jobInfo[normalizedRouteKey]) {
    infoKey = normalizedRouteKey;
  } else {
    // try alternative match (some jobInfo keys might be in different case)
    const keys = Object.keys(jobInfo || {});
    const found = keys.find((k) => k.toLowerCase() === normalizedRouteKey);
    if (found) infoKey = found;
  }
  // if still not found, check if provided slug maps to a broad category
  if (!infoKey) {
    const broad = slugToKey[rawRoute.toLowerCase()];
    if (broad && jobInfo[broad]) {
      infoKey = broad;
    }
  }
  // final fallback: use normalizedRouteKey as a key (it will probably not have questions in jobInfo)
  if (!infoKey) infoKey = normalizedRouteKey || rawRoute || null;

  // load questions (prefer local jobInfo). If previous finished attempt exists and cooldown active,
  // load snapshot from localStorage so review persists.
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      let pool = [];

      // 1) if jobInfo has questions for infoKey (exact or broad), use them
      if (infoKey && jobInfo[infoKey] && Array.isArray(jobInfo[infoKey].questions)) {
        pool = jobInfo[infoKey].questions;
      } else {
        // 2) try a backend fallback: pass the original route param (server should handle mapping)
        try {
          const res = await fetch(`http://localhost:5000/quiz/${rawRoute}`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.questions)) pool = data.questions;
          }
        } catch (err) {
          // ignore fetch errors and fall back to empty pool
          // console.warn("Quiz fetch failed", err);
        }
      }

      // use normalizedRouteKey for storage keys (stable)
      const stamp = Number(localStorage.getItem(ATTEMPT_KEY(normalizedRouteKey)) || 0);
      const now = Date.now();

      if (stamp && now < stamp + RETAKE_MS) {
        // load stored snapshot (if present)
        const saved = localStorage.getItem(RESULT_KEY(normalizedRouteKey));
        if (saved) {
          try {
            const attempt = JSON.parse(saved);
            setQuestions(attempt.questions || sampleQuestions(pool, TOTAL_QUESTIONS));
            setAnswers(attempt.answers || {});
            setScore(attempt.score || 0);
            setFinished(true);
            const remain = Math.ceil((stamp + RETAKE_MS - now) / 1000);
            setCooldownRemaining(remain);
            setLoading(false);
            return;
          } catch {
            // malformed -> ignore and continue
          }
        }
        // no saved result found -> mark finished (blocked) with empty result snapshot
        setQuestions(sampleQuestions(pool, TOTAL_QUESTIONS));
        setFinished(true);
        setScore(0);
        const remain = Math.ceil((stamp + RETAKE_MS - now) / 1000);
        setCooldownRemaining(remain);
        setLoading(false);
        return;
      }

      // no active cooldown -> prepare a fresh random set
      setQuestions(sampleQuestions(pool, TOTAL_QUESTIONS));
      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawRoute, normalizedRouteKey, infoKey, user]);

  // tick cooldown
  useEffect(() => {
    if (cooldownRef.current) {
      clearInterval(cooldownRef.current);
      cooldownRef.current = null;
    }
    if (cooldownRemaining > 0) {
      cooldownRef.current = setInterval(() => {
        setCooldownRemaining((c) => {
          if (c <= 1) {
            clearInterval(cooldownRef.current);
            cooldownRef.current = null;
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
        cooldownRef.current = null;
      }
    };
  }, [cooldownRemaining]);

  if (!user) {
    return (
      <main className="quiz-wrap">
        <div className="quiz-empty">
          <p>You're not logged in. Please sign up / login.</p>
          <button onClick={() => navigate("/signup")}>Go to Signup</button>
        </div>
      </main>
    );
  }

  // unknown exam guard
  if (!infoKey) {
    return (
      <main className="quiz-wrap">
        <div className="quiz-empty">
          <p>Unknown exam: <strong>{rawRoute || "N/A"}</strong></p>
          <button onClick={() => navigate("/dashboard")}>Back to dashboard</button>
        </div>
      </main>
    );
  }

  if (loading) return <main className="quiz-wrap"><div className="quiz-empty">Loading quiz...</div></main>;
  if (!questions || !questions.length) {
    return (
      <main className="quiz-wrap">
        <div className="quiz-empty">
          <h2>{(jobInfo[infoKey] && jobInfo[infoKey].title) || infoKey} — Quiz</h2>
          <p>No quiz available yet for {infoKey}. Please check later.</p>
          <button onClick={() => navigate("/dashboard")}>Back</button>
        </div>
      </main>
    );
  }

  const q = questions[cur];

  const getQText = (qq) => {
    if (!qq) return "";
    if (lang === "hi") return qq.q_hi || qq.q_en || qq.q || "";
    return qq.q_en || qq.q || qq.q_hi || "";
  };

  const getOptions = (qq) => {
    if (!qq) return [];
    if (lang === "hi") return qq.options_hi || qq.options_en || qq.options || [];
    return qq.options_en || qq.options || qq.options_hi || [];
  };

  const choose = (idx) => {
    // record selection
    setAnswers((prev) => ({ ...prev, [cur]: idx }));
  };

  const handleNext = () => {
    if (answers[cur] === undefined) return; // require selection
    if (cur + 1 < questions.length) {
      setCur((c) => c + 1);
    } else {
      // finish
      let s = 0;
      questions.forEach((qq, idx) => {
        const sel = answers[idx];
        if (typeof sel === "number" && sel === qq.answer) s++;
      });
      setScore(s);
      setFinished(true);

      const now = Date.now();
      localStorage.setItem(ATTEMPT_KEY(normalizedRouteKey), String(now));
      // save snapshot (questions, answers, score)
      const attempt = {
        at: now,
        score: s,
        total: questions.length,
        answers,
        questions
      };
      localStorage.setItem(RESULT_KEY(normalizedRouteKey), JSON.stringify(attempt));
      setCooldownRemaining(Math.ceil(RETAKE_MS / 1000));
    }
  };

  const handleRetry = () => {
    if (cooldownRemaining > 0) return;
    // remove stored attempt/result
    localStorage.removeItem(ATTEMPT_KEY(normalizedRouteKey));
    localStorage.removeItem(RESULT_KEY(normalizedRouteKey));
    // produce a fresh random set from job pool
    let pool = [];
    if (infoKey && jobInfo[infoKey] && Array.isArray(jobInfo[infoKey].questions)) {
      pool = jobInfo[infoKey].questions;
    }
    setQuestions(sampleQuestions(pool, TOTAL_QUESTIONS));
    setAnswers({});
    setCur(0);
    setFinished(false);
    setScore(0);
  };

  // UI
  return (
    <main className="quiz-wrap">
      <header className="quiz-header">
        <div>
          <h2>{(jobInfo[infoKey] && jobInfo[infoKey].title) || infoKey} — {lang === "hi" ? "क्विज़" : "Quiz"}</h2>
          <div className="quiz-desc">{(jobInfo[infoKey] && jobInfo[infoKey].desc) || ""}</div>
        </div>

        <div className="quiz-timer">
          {finished ? (
            <div className="cooldown-note"> {lang === "hi" ? "पुनः प्रयास के लिए शेष समय" : "Retry available in"} <strong>{formatTime(cooldownRemaining)}</strong></div>
          ) : (
            <div className="q-progress">{lang === "hi" ? "प्रश्न" : "Question"} {cur + 1} / {questions.length}</div>
          )}
        </div>
      </header>

      {!finished ? (
        <section className="quiz-card">
          <div className="question-text">{getQText(q)}</div>

          <div className="options-list">
            {getOptions(q).map((opt, idx) => {
              const isSel = answers[cur] === idx;
              return (
                <button
                  key={idx}
                  className={`opt ${isSel ? "selected" : ""}`}
                  onClick={() => choose(idx)}
                >
                  <span className="opt-index">{String.fromCharCode(65 + idx)}</span>
                  <span className="opt-text">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="quiz-actions">
            <button
              className={`btn primary ${answers[cur] === undefined ? "disabled" : ""}`}
              onClick={handleNext}
              disabled={answers[cur] === undefined}
            >
              {cur + 1 >= questions.length ? (lang === "hi" ? "समाप्त करें" : "Finish") : (lang === "hi" ? "अगला" : "Next")}
            </button>

            <button className="btn" onClick={() => navigate("/dashboard")}>
              {lang === "hi" ? "डैशबोर्ड पर वापस जाएँ" : "Back to Dashboard"}
            </button>
          </div>
        </section>
      ) : (
        <section className="quiz-card">
          <h3>{lang === "hi" ? "आपका परिणाम" : "Your Result"}</h3>
          <div className="score">{score} / {questions.length}</div>

          <div className="review">
            <h4>{lang === "hi" ? "रिव्यू" : "Review"}</h4>
            <div className="review-list">
              {questions.map((qq, idx) => {
                const sel = answers[idx];
                const correct = qq.answer;
                const isCorrect = typeof sel === "number" && sel === correct;
                return (
                  <div key={idx} className={`review-item ${isCorrect ? "correct" : "wrong"}`}>
                    <div className="review-q"><strong>{idx + 1}.</strong> {lang === "hi" ? (qq.q_hi || qq.q_en || qq.q) : (qq.q_en || qq.q || qq.q_hi)}</div>
                    <div className="review-a">
                      <div>{lang === "hi" ? "आपका उत्तर:" : "Your answer:"} <strong>{(sel === undefined || sel === null) ? (lang === "hi" ? "उत्तर नहीं दिया" : "Not answered") : (lang === "hi" ? (qq.options_hi && qq.options_hi[sel]) || qq.options_en[sel] || qq.options[sel] : (qq.options_en && qq.options_en[sel]) || qq.options[sel] || qq.options_hi[sel])}</strong></div>
                      {!isCorrect && (
                        <div className="corr">{lang === "hi" ? "सही उत्तर:" : "Correct answer:"} <strong>{lang === "hi" ? (qq.options_hi && qq.options_hi[correct]) || qq.options_en[correct] : (qq.options_en && qq.options_en[correct]) || qq.options_hi[correct]}</strong></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="quiz-actions">
            <button
              onClick={handleRetry}
              className={`btn primary ${cooldownRemaining > 0 ? "disabled" : ""}`}
              disabled={cooldownRemaining > 0}
            >
              {lang === "hi" ? "रीट्राय" : "Retry"}
            </button>

            <button className="btn" onClick={() => navigate("/dashboard")}>
              {lang === "hi" ? "डैशबोर्ड" : "Back to Dashboard"}
            </button>

            {cooldownRemaining > 0 && (
              <div className="cooldown-msg">{lang === "hi" ? "आप " : "You can retry after: "} <strong>{formatTime(cooldownRemaining)}</strong></div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

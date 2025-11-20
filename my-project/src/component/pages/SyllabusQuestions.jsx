import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SyllabusQuestions.css";

const SyllabusQuestions = () => {
  const { id } = useParams(); // current question id (may be used)
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer passed data
  const initialQuestion = location.state?.question || null;
  const initialAll = location.state?.allQuestions || null;
  const jobName = location.state?.job || localStorage.getItem("job") || null;

  const [question, setQuestion] = useState(initialQuestion);
  const [allQuestions, setAllQuestions] = useState(initialAll || []);
  const [index, setIndex] = useState(() => {
    if (initialAll && id) {
      const i = initialAll.findIndex((q) => q.id === id);
      return i >= 0 ? i : 0;
    }
    return 0;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  // fetch single question by id if not provided
  useEffect(() => {
    if (question) return;

    const fetchById = async () => {
      if (!id) {
        setError("Question id missing");
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/question/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        const q = data.question || data;
        setQuestion(q);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Question not found");
        setLoading(false);
      }
    };

    fetchById();
  }, [id, question]);

  // if allQuestions present and index changes, set question
  useEffect(() => {
    if (Array.isArray(allQuestions) && allQuestions.length > 0) {
      if (index >= 0 && index < allQuestions.length) {
        setQuestion(allQuestions[index]);
      }
    }
  }, [index, allQuestions]);

  // helper: update selection in allQuestions array and current question
  const selectOption = (optIndex) => {
    // mark selection only when running from allQuestions list
    if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
      // single-question view (no array): update local question only
      setQuestion((prev) => ({ ...prev, selected: optIndex }));
      return;
    }

    const updated = allQuestions.map((q, i) =>
      i === index ? { ...q, selected: optIndex } : q
    );
    setAllQuestions(updated);
    setQuestion((prev) => ({ ...prev, selected: optIndex }));

    // keep state when navigate so next page has selections if component remounts
    // (we will pass allQuestions in navigate)
  };

  const goNext = () => {
    if (Array.isArray(allQuestions) && allQuestions.length > 0 && index < allQuestions.length - 1) {
      const nextIdx = index + 1;
      const nextQ = allQuestions[nextIdx];
      setIndex(nextIdx);
      navigate(`/question/${encodeURIComponent(nextQ.id)}`, {
        state: { question: nextQ, allQuestions, job: jobName },
      });
    }
  };

  const goPrev = () => {
    if (Array.isArray(allQuestions) && allQuestions.length > 0 && index > 0) {
      const prevIdx = index - 1;
      const prevQ = allQuestions[prevIdx];
      setIndex(prevIdx);
      navigate(`/question/${encodeURIComponent(prevQ.id)}`, {
        state: { question: prevQ, allQuestions, job: jobName },
      });
    }
  };

  // Finish: compute score and show overview
  const handleFinish = () => {
    if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
      // single question only — mark score 0 or 1 depending
      const correct = question && question.selected === question.answer ? 1 : 0;
      setScore(correct);
      setFinished(true);
      return;
    }

    let correctCount = 0;
    allQuestions.forEach((q) => {
      if (typeof q.answer !== "undefined" && q.selected === q.answer) correctCount++;
    });
    setScore(correctCount);
    setFinished(true);
  };

  const handleRetake = () => {
    // reset selections
    const reset = allQuestions.map((q) => ({ ...q, selected: undefined }));
    setAllQuestions(reset);
    setFinished(false);
    setScore(0);
    setIndex(0);
    const first = reset[0];
    if (first) {
      navigate(`/question/${encodeURIComponent(first.id)}`, {
        state: { question: first, allQuestions: reset, job: jobName },
      });
    }
  };

  const handleBack = () => {
    // go back to syllabus or dashboard
    if (jobName) navigate(`/syllabus/${jobName}`);
    else navigate("/dashboard");
  };

  if (loading) return <p className="sq-loading">Loading question...</p>;
  if (error) return <p className="sq-error">{error}</p>;
  if (!question) return <p className="sq-error">No question to display.</p>;

  // Overview view after finish
  if (finished) {
    const total = Array.isArray(allQuestions) && allQuestions.length > 0 ? allQuestions.length : 1;
    return (
      <div className="sq-container">
        <div className="sq-card">
          <h2 className="sq-id">Overview</h2>
          <p className="sq-question">Score: {score} / {total}</p>

          <div className="sq-overview-list">
            {(Array.isArray(allQuestions) && allQuestions.length > 0 ? allQuestions : [question]).map((q, idx) => {
              const isCorrect = q.selected === q.answer;
              return (
                <div key={q.id || idx} className={`sq-overview-item ${isCorrect ? "correct" : "incorrect"}`}>
                  <div className="ov-q-header">
                    <strong>{idx + 1}. </strong>
                    <span className="ov-q-text">{q.q_en}</span>
                  </div>
                  <div className="ov-answers">
                    <div>
                      <small>Selected: </small>
                      <strong>{typeof q.selected === "number" ? `${String.fromCharCode(65 + q.selected)}. ${q.options_en[q.selected]}` : <em>Not Answered</em>}</strong>
                    </div>
                    <div>
                      <small>Correct: </small>
                      <strong>{typeof q.answer === "number" ? `${String.fromCharCode(65 + q.answer)}. ${q.options_en[q.answer]}` : <em>N/A</em>}</strong>
                    </div>
                    <div className="ov-result">{isCorrect ? "✓ Correct" : "✕ Wrong"}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sq-bottom">
            <button className="sq-btn" onClick={handleRetake}>Retake</button>
            <button className="sq-btn" onClick={() => {
              // let user review questions sequentially
              setFinished(false);
              setIndex(0);
              const first = (Array.isArray(allQuestions) && allQuestions.length > 0) ? allQuestions[0] : question;
              if (first) {
                navigate(`/question/${encodeURIComponent(first.id)}`, {
                  state: { question: first, allQuestions, job: jobName },
                });
                setQuestion(first);
              }
            }}>Review</button>
            <button className="sq-btn" onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  // normal question view
  const atLast = Array.isArray(allQuestions) && allQuestions.length > 0 ? index === allQuestions.length - 1 : true;

  return (
    <div className="sq-container">
      <div className="sq-card">
        <h2 className="sq-id">{question.id}</h2>
        <p className="sq-question">{question.q_en}</p>

        <ul className="sq-options-list">
          {question.options_en?.map((opt, i) => {
            const isSelected = question.selected === i;
            return (
              <li
                key={i}
                className={`sq-option ${isSelected ? "selected" : ""}`}
                onClick={() => selectOption(i)}
              >
                <span className="sq-option-prefix">{String.fromCharCode(65 + i)}.</span>{" "}
                {opt}
              </li>
            );
          })}
        </ul>

        <div className="sq-bottom">
          <button className="sq-btn" onClick={goPrev} disabled={index <= 0}>← Prev</button>

          {!atLast && (
            <button
              className="sq-btn"
              onClick={() => {
                // navigate to next preserving state
                if (Array.isArray(allQuestions) && allQuestions.length > 0) {
                  const nextIdx = index + 1;
                  const nextQ = allQuestions[nextIdx];
                  setIndex(nextIdx);
                  navigate(`/question/${encodeURIComponent(nextQ.id)}`, {
                    state: { question: nextQ, allQuestions, job: jobName },
                  });
                } else {
                  goNext();
                }
              }}
              disabled={Array.isArray(allQuestions) && allQuestions.length > 0 ? index >= allQuestions.length - 1 : false}
            >
              Next →
            </button>
          )}

          {atLast && (
            <button className="sq-btn finish" onClick={handleFinish}>Finish</button>
          )}

          <span className="sq-answer">Selected: {typeof question.selected === "number" ? String.fromCharCode(65 + question.selected) : "—"}</span>
        </div>
      </div>
    </div>
  );
};

export default SyllabusQuestions;

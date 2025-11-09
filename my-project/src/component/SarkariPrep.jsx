import React, { useState, useEffect, useMemo } from "react";
import "./SarkariPrep.css";

const SarkariPrep = () => {
  const exams = [
    { id: "ssc", title: "SSC CGL", papers: 2, duration: "2 hrs", vacancies: 12500 },
    { id: "bank", title: "IBPS / SBI PO", papers: 2, duration: "2 hrs", vacancies: 8000 },
    { id: "rail", title: "Railway NTPC", papers: 1, duration: "1.5 hrs", vacancies: 10000 },
  ];

  const [selectedExamId, setSelectedExamId] = useState("");
  const selectedExam = useMemo(
    () => exams.find((e) => e.id === selectedExamId),
    [selectedExamId]
  );

  const [timeLeft, setTimeLeft] = useState("");
  const [notesBought, setNotesBought] = useState(false);

  // ⏱ Countdown for Daily Quiz
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
      if (now > target) target.setDate(target.getDate() + 1);
      const diff = target - now;
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sarkariprep">
      {/* Header */}
      <header className="header">
        <h1>SarkariPrep</h1>
        <nav>
          <button>Home</button>
          <button>Practice</button>
          <button>Daily Quiz</button>
          <button>Notes</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h2>Smart Practice for Government Exams</h2>
            <p>Practice chapter-wise, take daily quizzes & track your weak areas.</p>
            <button className="start-btn">Start Practice</button>
          </div>

          <div className="quiz-card">
            <h3>Daily Quiz</h3>
            <p>Next quiz starts in {timeLeft}</p>
            <button>Join Quiz</button>
          </div>
        </section>

        {/* Exam Selection Section */}
        <section className="exam-section">
          <h3>Select Your Exam</h3>
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
          >
            <option value="">-- Choose Exam --</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>

          {selectedExam && (
            <div className="exam-details">
              <h4>{selectedExam.title}</h4>
              <p>Papers: {selectedExam.papers}</p>
              <p>Duration: {selectedExam.duration}</p>
              <p>Vacancies: {selectedExam.vacancies}</p>

              <div className="levels">
                <h5>Practice Levels</h5>
                <div className="level-buttons">
                  <button>Easy</button>
                  <button>Medium</button>
                  <button>Hard</button>
                </div>
                <button className="buy-btn">Buy ₹21/month</button>
              </div>
            </div>
          )}
        </section>

        {/* Notes Section */}
        <section className="notes-section">
          <h3>Study Notes & NCERT (6th–12th)</h3>
          <button onClick={() => setNotesBought(true)}>
            {notesBought ? "Purchased ✅" : "Buy Notes ₹11"}
          </button>
        </section>

        {/* AI Assistant Section */}
        <section className="ai-section">
          <h3>Ask AI Assistant 🤖</h3>
          <input type="text" placeholder="Ask any question..." />
          <button>Ask</button>
        </section>
      </main>
    </div>
  );
};

export default SarkariPrep;

import React from "react";
import "./PracticeSection.css";

const PracticeSection = () => {
  return (
    <section className="practice-section">
      <h3>Chapter-wise Practice</h3>
      <p>Choose an exam above to view its chapter-wise syllabus and practice options.</p>
      <p>Buy for ₹199 (6 months) to unlock all chapters.</p>

      <div className="cards">
        <div className="card">
          <h4>Concise Notes</h4>
          <p>One-time ₹11 — PDF + Sample view</p>
          <button className="buy-btn">Buy ₹11</button>
        </div>

        <div className="card">
          <h4>NCERT 6–12</h4>
          <p>Free class-wise PDFs mapped to exam chapters.</p>
          <button>Open NCERT</button>
        </div>

        <div className="card">
          <h4>Daily Current Affairs</h4>
          <p>Daily 5-question sets + monthly consolidated PDF.</p>
          <div className="dual-btns">
            <button className="buy-btn">Monthly PDF</button>
            <button>Daily CA</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;

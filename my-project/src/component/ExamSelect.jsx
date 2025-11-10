import React, { useState } from "react";
import "./ExamSelect.css";

const ExamSelect = () => {
  const [selectedExam, setSelectedExam] = useState("");

  return (
    <section className="exam-select">
      <label>Select Exam</label>
      <select onChange={(e) => setSelectedExam(e.target.value)}>
        <option value="">-- Choose exam --</option>
        <option value="ssc">SSC CGL</option>
        <option value="railway">Railway</option>
        <option value="banking">Banking</option>
        <option value="defense">Defense</option>
      </select>

      {selectedExam && (
        <div className="exam-card">
          <h4>Gov Practice</h4>
          <p>₹21 / month</p>
          <p>Mixed 30Q sets • Step flow • Mock reports</p>
          <button className="subscribe-btn">Subscribe</button>
        </div>
      )}
    </section>
  );
};

export default ExamSelect;

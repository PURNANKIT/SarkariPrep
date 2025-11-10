import React, { useState } from "react";
import "./Signup.css";

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    jobPrep: "",
    examYear: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.jobPrep ||
      !formData.examYear ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("⚠️ All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          job_preparation: formData.jobPrep,
          preparation_year: Number(formData.examYear),
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "❌ Signup failed!");
      } else {
        console.log("✅ Signup Success", data);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError("❌ Server error, try again later");
    }
  };

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>Create Your Account</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
          />

          <select name="jobPrep" value={formData.jobPrep} onChange={handleChange}>
            <option value="">Select Job Preparation</option>
            <option value="UPSC">UPSC</option>
            <option value="SSC">SSC</option>
            <option value="Bank">Bank</option>
            <option value="Railway">Railway</option>
            <option value="Defence">Defence</option>
            <option value="State Exam">State Exam</option>
            <option value="Other">Other</option>
          </select>

          <select name="examYear" value={formData.examYear} onChange={handleChange}>
            <option value="">Select Exam Year</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = ({ onClose, onSuccess }) => {
  const navigate = useNavigate();

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
  const [okMsg, setOkMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
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
      const res = await fetch(
        "https://informational-paxton-unliquidated.ngrok-free.dev/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            job_preparation: formData.jobPrep,
            preparation_year: formData.examYear,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "❌ Signup failed!");
        return;
      }

      setOkMsg(
        "✅ Signup successful! Please check your email for verification."
      );
      onSuccess?.(formData.email);

      setTimeout(() => onClose?.(), 2000);
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
        {okMsg && <p className="success">{okMsg}</p>}

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

          {/* UPDATED JOB PREP OPTIONS */}
          <select
            name="jobPrep"
            value={formData.jobPrep}
            onChange={handleChange}
          >
            <option value="">Select Job Preparation</option>
            <option value="ssc_cgl">SSC CGL</option>
            <option value="ssc_chsl">SSC CHSL</option>
            <option value="ssc_gd">SSC GD</option>
            <option value="railway">Railway Exams</option>
            <option value="banking">Banking Exams</option>
            <option value="upsc">UPSC</option>
            <option value="up_police">UP Police</option>
            <option value="state_police">State Police</option>
          </select>

          <select
            name="examYear"
            value={formData.examYear}
            onChange={handleChange}
          >
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

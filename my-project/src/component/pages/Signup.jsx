//updated code

import React, { useState } from "react";
import "./Signup.css";

export default function Signup({ onClose }) {
  // 🆕 Changed: now using error object instead of single message
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    jobPrep: "",
    examYear: "",
    password: "",
    confirmPassword: "",
  });

  const [okMsg, setOkMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    jobPrep: "",
    examYear: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((p) => ({ ...p, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {}; // 🆕 Field-wise error storage

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (formData.mobile.length !== 10)
      newErrors.mobile = "Mobile number must be 10 digits.";
    if (!formData.jobPrep) newErrors.jobPrep = "Select a preparation field.";
    if (!formData.examYear) newErrors.examYear = "Select exam year.";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must have 6+ chars, upper, lower, number & symbol.";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    // 🆕 If any error found → stop and display under that field
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(
        "https://jasper-unaffixed-denisha.ngrok-free.dev/signup",
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
        // 🔥 Only change backend message location — now shows under password field
        setErrors({ password: data.message });
        return;
      }

      setOkMsg("Signup Successful!");
      setTimeout(() => onClose(), 1500);
    } catch {
      setErrors({ password: "Server error — try again later" });
    }
  };

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          {errors.fullName && <p className="field-error">{errors.fullName}</p>}{" "}
          {/* 🆕 Field Error */}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}{" "}
          {/* 🆕 */}
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
          {errors.mobile && <p className="field-error">{errors.mobile}</p>}{" "}
          {/* 🆕 */}
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
          {errors.jobPrep && <p className="field-error">{errors.jobPrep}</p>}{" "}
          {/* 🆕 */}
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
          {errors.examYear && <p className="field-error">{errors.examYear}</p>}{" "}
          {/* 🆕 */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <p className="field-error">{errors.password}</p>}{" "}
          {/* 🆕 */}
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="field-error">{errors.confirmPassword}</p>
          )}{" "}
          {/* 🆕 */}
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://jasper-unaffixed-denisha.ngrok-free.dev/admin/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("✅ Admin created successfully");
      navigate("/");
    } catch (err) {
      setError("❌ Server error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>📝 Admin Signup</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Strong Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Create Admin</button>

        <p className="switch-text" onClick={() => navigate("/")}>
          Already have account? Login
        </p>
      </form>
    </div>
  );
};

export default AdminSignup;

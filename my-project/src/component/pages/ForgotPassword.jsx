import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Enter your email");

    try {
      const res = await fetch(
        "https://jasper-unaffixed-denisha.ngrok-free.dev/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) return setError(data.message || "Error sending email");

      setMessage("✅ Reset link sent! Check your email.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("❌ Server error");
    }
  };

  return (
    <div className="forgot-modal" onClick={(e) => e.stopPropagation()}>
      <button
        className="close-btn"
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          fontSize: "1.3rem",
          background: "#f5f5f5",
          border: "none",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
          color: "#dd0909ff",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: "10",
        }}
        onClick={onClose}
      >
        {" "}
        ✖
      </button>
      <h2>Reset Password</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div>
        {" "}
        {/* Changed from <form> to <div> */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={handleSubmit}>Send Reset Link</button>
      </div>
    </div>
  );
};

export default ForgotPassword;

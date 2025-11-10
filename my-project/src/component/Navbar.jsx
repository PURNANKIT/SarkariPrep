import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Signup from "./pages/Signup";

const Navbar = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const [showSignup, setShowSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formdata.username.trim()) newErrors.username = "Email is required";
    if (!formdata.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formdata.username, password: formdata.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.msg || "Login failed" });
        setLoginSuccess(false);
      } else {
        setLoginSuccess(true);
        setFormdata({ username: "", password: "" });

        // Hide success message after 3 seconds
        setTimeout(() => setLoginSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: "Server error, try again later" });
      setLoginSuccess(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <h1 className="logo">SarkariPrep</h1>
          <div className="links-search-group">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/practice">Practice</Link>
              <Link to="/quiz">Daily Quiz</Link>
              <Link to="/notes">Notes</Link>
              <Link to="/askAi">Ask AI</Link>
            </div>
            <input type="search" placeholder="Search..." className="search_bar" />
          </div>
        </div>

        <div className="nav-actions">
          {loginSuccess ? (
            <div className="login-success-container">
              <p className="login-success-text">You have successfully logged in!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-inputs">
                <input
                  type="text"
                  name="username"
                  value={formdata.username}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                {errors.username && <p className="error-text">{errors.username}</p>}

                <input
                  type="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}

                {errors.form && <p className="error-text">{errors.form}</p>}

                <div className="auth-links">
                  <a href="#">Forget Password?</a>
                  <button
                    type="button"
                    onClick={() => setShowSignup(true)}
                    className="signup-link-btn"
                  >
                    Signup
                  </button>
                </div>
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>

      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </>
  );
};

export default Navbar;

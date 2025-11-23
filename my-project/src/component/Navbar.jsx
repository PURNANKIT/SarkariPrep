import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword"; // ✅ Import ForgotPassword
import { useUser } from "./context/UserContext";

const Navbar = () => {
  const [formdata, setFormdata] = useState({ identifier: "", password: "" });
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false); // ✅ Forgot state
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  const { user, setUser, language, setLanguage } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => setLoginSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formdata.identifier.trim())
      newErrors.identifier = "Email or Mobile is required";
    if (!formdata.password.trim())
      newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formdata.identifier,
          password: formdata.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.message || "Login failed" });
        return;
      }

      const token = data.token;
      const u = data.user;

      setUser({
        id: u.id,
        full_name: u.full_name,
        email: u.email,
        mobile: u.mobile,
        job_preparation: u.job_preparation,
        preparation_year: u.preparation_year,
      });

      setLoginSuccess(true);
      localStorage.setItem("token", token);

      setFormdata({ identifier: "", password: "" });
      setShowSignup(false);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setErrors({ form: "❌ Server error, try again later" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
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
              <Link to="/quiz/ssc">Daily Quiz</Link>
              <Link to="/notes">Notes</Link>
              <Link to="/askAi">Ask AI</Link>
            </div>
            <input type="search" placeholder="Search..." className="search_bar" />
          </div>
        </div>

        <div className="nav-actions">
          <div className="lang-select" style={{ marginRight: 12 }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ padding: "6px 8px", borderRadius: 6 }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {user ? (
            <div className="profile-section">
              {loginSuccess && (
                <span className="welcome-text">
                  Welcome, {user.full_name || "User"} 👋
                </span>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-inputs">
                <input
                  type="text"
                  name="identifier"
                  value={formdata.identifier}
                  onChange={handleChange}
                  placeholder="Email or Mobile"
                />
                {errors.identifier && <p className="error-text">{errors.identifier}</p>}

                <input
                  type="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
                {errors.form && <p className="error-text">{errors.form}</p>}

                <div className="auth-links">
                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() => setShowForgot(true)}
                  >
                    Forget Password?
                  </button>

                  {showForgot && <ForgotPassword onClose={() => setShowForgot(false)} />}

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

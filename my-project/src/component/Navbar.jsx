import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { useUser } from "./context/UserContext";
import "./Navbar.css";

const BASE_URL = "http://localhost:5000"; // ✅ SAME BASE URL

const Navbar = () => {
  const [formdata, setFormdata] = useState({ identifier: "", password: "" });
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [prevPath, setPrevPath] = useState("/");
  const [unreadCount, setUnreadCount] = useState(0);
  const [prevNotifPath, setPrevNotifPath] = useState("/");

  const { user, setUser, language, setLanguage } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FETCH UNREAD COUNT
  useEffect(() => {
    if (!user?.id) return;

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000);

    return () => clearInterval(interval);
  }, [user?.id]);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/notifications/user/${user.id}`);
      const data = await res.json();

      if (data.success) {
        const unread = data.notifications.filter(
          (n) => !n.read_by?.includes(user.id.toString())
        ).length;

        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("❌ Error fetching unread count", error);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => setLoginSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formdata.identifier.trim())
      newErrors.identifier = "Email or Mobile is required";
    if (!formdata.password.trim()) newErrors.password = "Password is required";

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setLoginSuccess(true);

      setFormdata({ identifier: "", password: "" });
      setShowSignup(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setErrors({ form: "❌ Server error, try again later" });
    }
  };

  // ✅ ✅ ✅ NOTIFICATION TOGGLE (OPEN + CLOSE) — FINAL FIX
  const handleNotificationToggle = () => {
    if (location.pathname !== "/notification") {
      setPrevNotifPath(location.pathname);
      navigate("/notification");
    } else {
      navigate(prevNotifPath);
    }
  };

  // ✅ Profile toggle
  const handleProfile = () => {
    if (!profileOpen) {
      setPrevPath(location.pathname);
      navigate("/profile", { state: { from: location.pathname } });
    } else {
      navigate(prevPath);
    }
    setProfileOpen(!profileOpen);
  };

  // ✅ ✅ ✅ LOGOUT FIXED
  const handleLogout = async () => {
    try {
      if (user?.id) {
        await fetch(`${BASE_URL}/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        });
      }
    } catch (err) {
      console.error("❌ Logout API error", err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    setUnreadCount(0);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="logo" style={{ margin: 0 }}>
              SarkariPrep
            </h1>
          </a>

          <div className="links-search-group">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/practice">Practice</Link>
              <Link to="/news-paper">News Paper</Link>
              <Link to="/notes">Notes</Link>
              <Link to="/askAi">Ask AI</Link>
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="search_bar"
            />
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
                  Welcome, {user.full_name} 👋
                </span>
              )}

              {/* ✅ ✅ ✅ NOTIFICATION BELL (TOGGLE ENABLED, NOTHING REMOVED) */}
              <div
                style={{
                  position: "relative",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={handleNotificationToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>

                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "10px",
                      padding: "2px 6px",
                      fontWeight: "bold",
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>

              <div className="profile-wrapper">
                <button onClick={handleProfile} className="logout-btn">
                  <CgProfile />
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <p className="profile-name">{user.full_name}</p>

                    <button className="logout-btn-red" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
                {errors.identifier && (
                  <p className="error-text">{errors.identifier}</p>
                )}

                <input
                  type="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}

                {errors.form && <p className="error-text">{errors.form}</p>}

                <div className="auth-links">
                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() => setShowForgot(true)}
                  >
                    Forget Password?
                  </button>

                  {showForgot && (
                    <ForgotPassword onClose={() => setShowForgot(false)} />
                  )}

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

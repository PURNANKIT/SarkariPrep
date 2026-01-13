import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ CHECK ADMIN LOGIN STATUS
  const admin = localStorage.getItem("admin");
  const adminToken = localStorage.getItem("adminToken");

  const isAdminLoggedIn = admin && adminToken;

  const handleLogout = () => {
    // ✅ CLEAR ADMIN AUTH DATA
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    // ✅ REDIRECT TO LOGIN
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <h2 className="admin-logo">Admin Panel</h2>
      </div>

      <div className="admin-navbar-right">
        {isAdminLoggedIn && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "admin-link active" : "admin-link"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/notification"
              className={({ isActive }) =>
                isActive ? "admin-link active" : "admin-link"
              }
            >
              Send Notification
            </NavLink>

            {/* ✅ ✅ ✅ LOGOUT ONLY WHEN ADMIN LOGGED IN */}
            <button className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get location state
  const { setUser: setContextUser } = useUser();

  const fromPath = location.state?.from || "/"; // Default to home if no previous path

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      alert("Profile fetch failed. Please log in again.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setContextUser(null);
    navigate("/");
  };

  const handleClose = () => {
    navigate(fromPath); // Go back to previous page
  };

  if (loading) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
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
          onClick={handleClose}
        >
          {" "}
          ✖
        </button>
      </div>

      {user ? (
        <div className="profile-details">
          <div className="profile-avatar">
            {user.full_name?.charAt(0).toUpperCase()}
          </div>

          <p>
            <strong>Name:</strong> {user.full_name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>
          <p>
            <strong>Job Preparation:</strong> {user.job_preparation}
          </p>
          <p>
            <strong>Year:</strong> {user.preparation_year}
          </p>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
}

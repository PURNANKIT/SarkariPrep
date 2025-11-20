import React from "react";
import { useNavigate } from "react-router-dom";
import jobInfo from "../JobInfo/jobInfo";
import "./Dashboard.css";
import { useUser } from "../context/UserContext";
import Header from "../Header";
import Home from "../pages/Home";

const slugify = (s) =>
  String(s || "").trim().toLowerCase().replace(/\s+/g, "-");

const Dashboard = () => {
  const { user } = useUser();

  // context → OR → localStorage fallback
  const storedUser =
    user || JSON.parse(localStorage.getItem("user") || "null");

  const navigate = useNavigate();

  // If user not logged in → show home page
  if (!storedUser) return <Home />;

  // exactKey: prefer syllabus_key (exact), else localStorage 'job', else fallback to broad
  const exactKey =
    storedUser.syllabus_key ||
    localStorage.getItem("job") ||
    storedUser.job_preparation ||
    "";

  // broad category (SSC/UPSC/Railway/Bank/Defence/Police/State Exam/Other)
  const broad = storedUser.job_preparation || "";

  // Try exact key first, then broad category, then Other fallback
  const info =
    (exactKey && jobInfo[exactKey]) ||
    (broad && jobInfo[broad]) ||
    jobInfo.Other;

  // Build slug from exactKey if possible, otherwise from broad
  const routeKey = exactKey || broad;
  const jobSlug = slugify(routeKey);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Title: show user's exact selected job (nicely formatted) — fallback to info.title
  const titleFromExact = exactKey ? exactKey.replace(/_/g, " ").toUpperCase() : null;
  const pageTitle = titleFromExact || (info && info.title) || "Practice";

  return (
    <div>
      <Header />
      <div className="dashboard-container" role="region" aria-label="Dashboard">
        <h3 className="dashboard-title">{pageTitle}</h3>
        <p className="dashboard-desc">{info?.desc || ""}</p>

        <div className="button-row" role="list">
          <button
            role="listitem"
            onClick={() => handleNavigate(`/quiz/${jobSlug}`)}
          >
            <i className="fas fa-question-circle" aria-hidden="true"></i>
            <span className="btn-label">Quiz</span>
          </button>

          <button
            role="listitem"
            onClick={() => handleNavigate(`/practice/${jobSlug}`)}
          >
            <i className="fas fa-pencil-alt" aria-hidden="true"></i>
            <span className="btn-label">Start Practice</span>
          </button>

          <button
            role="listitem"
            onClick={() => handleNavigate(`/syllabus/${jobSlug}`)}
          >
            <i className="fas fa-book" aria-hidden="true"></i>
            <span className="btn-label">{info?.syllabusBtn || "Syllabus"}</span>
          </button>

          <button
            role="listitem"
            onClick={() => handleNavigate(`/pyq/${jobSlug}`)}
          >
            <i className="fas fa-file-alt" aria-hidden="true"></i>
            <span className="btn-label">View PYQs</span>
          </button>

          <button
            role="listitem"
            onClick={() => handleNavigate(`/videos/${jobSlug}`)}
          >
            <i className="fas fa-video" aria-hidden="true"></i>
            <span className="btn-label">Watch Videos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

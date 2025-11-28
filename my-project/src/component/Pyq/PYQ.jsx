import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Header from "../Header";
import "./PYQ.css";

const API_BASE = "http://localhost:5000";

const PYQ = () => {
  const { user } = useUser();
  const { slug } = useParams(); // /pyq/:slug

  const jobKey = useMemo(() => {
    if (!user) return slug;
    const raw = user.syllabus_key || user.job_preparation || slug;
    return String(raw);
  }, [user, slug]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pyqs, setPyqs] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!jobKey) return;

    setLoading(true);
    fetch(`${API_BASE}/api/pyq?job=${encodeURIComponent(jobKey)}`)
      .then((res) => res.json())
      .then((data) => {
        setPyqs(Array.isArray(data.pyq) ? data.pyq : []);
        setTitle(data.title || `${jobKey} PYQs`);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load PYQs");
        setLoading(false);
      });
  }, [jobKey]);

  if (loading) return <div className="loading">Loading PYQs...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!pyqs.length) return <div className="empty">No PYQs available</div>;

  return (
    <div className="pyq-page">
      <Header />
      <div className="pyq-container">
        <h2 className="pyq-title">{title}</h2>
        <p className="pyq-sub">2020 – 2025 Previous Year Question Papers</p>

        <ul className="pyq-list">
          {pyqs.map((item, index) => (
            <li key={index} className="pyq-item">
              <div className="pyq-year">{item.year}</div>
              <div className="pyq-name">{item.name}</div>
              {item.pdf && (
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pyq-btn"
                >
                  View PDF
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PYQ;

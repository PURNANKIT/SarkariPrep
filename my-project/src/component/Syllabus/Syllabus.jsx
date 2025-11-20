import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Syllabus.css";

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState({});
  const [activeTier, setActiveTier] = useState("");
  const [activeSubject, setActiveSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobName = localStorage.getItem("job");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSyllabus = async () => {
      if (!jobName) {
        setError("Job not found! Please signup again.");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/syllabus/${jobName}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch syllabus");
          setLoading(false);
          return;
        }

        const s = data.syllabus || {};
        setSyllabus(s);

        // set defaults
        const firstTier = Object.keys(s)[0] || "";
        setActiveTier(firstTier);
        const firstSubject = firstTier && s[firstTier] ? Object.keys(s[firstTier])[0] || "" : "";
        setActiveSubject(firstSubject);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Network error");
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, [jobName]);

  const slugify = (s) =>
    String(s || "").trim().toLowerCase().replace(/\s+/g, "-");

  const getChapterList = () => {
    if (!activeTier || !activeSubject) return [];
    const block = syllabus?.[activeTier]?.[activeSubject];
    if (!block) return [];

    // If block is object (chapterName -> array)
    if (typeof block === "object" && !Array.isArray(block)) {
      return Object.keys(block);
    }

    // If block is array:
    if (Array.isArray(block)) {
      if (block.length === 0) return [];
      if (typeof block[0] === "string") return block; // chapter names
      if (typeof block[0] === "object") return ["All Questions"]; // list of questions directly
    }

    return [];
  };

  const handleChapterClick = (chapter) => {
    const tierSlug = slugify(activeTier);
    const subjectSlug = slugify(activeSubject);
    const chapterSlug = slugify(chapter);

    const block = syllabus?.[activeTier]?.[activeSubject];
    let chapterQuestions = null;

    if (!block) {
      chapterQuestions = null;
    } else if (typeof block === "object" && !Array.isArray(block)) {
      // block is mapping: chapterName -> array (strings or question objects)
      chapterQuestions = block[chapter] || block[chapterSlug] || null;
    } else if (Array.isArray(block)) {
      // block is array (either strings or question objects)
      if (block.length && typeof block[0] === "object") {
        // array of question objects (we showed "All Questions")
        if (chapter === "All Questions") chapterQuestions = block;
      } else {
        chapterQuestions = null;
      }
    }

    // If we have question objects for this chapter, open the first question directly
    if (
      Array.isArray(chapterQuestions) &&
      chapterQuestions.length > 0 &&
      typeof chapterQuestions[0] === "object" &&
      chapterQuestions[0].id
    ) {
      const firstQ = chapterQuestions[0];
      navigate(`/question/${encodeURIComponent(firstQ.id)}`, {
        state: {
          job: jobName,
          tier: activeTier,
          subject: activeSubject,
          chapter,
          question: firstQ,
          allQuestions: chapterQuestions,
        },
      });
      return;
    }

    // otherwise go to a questions-listing page that can fetch or display strings
    navigate(`/questions/${jobName}/${tierSlug}/${subjectSlug}/${chapterSlug}`, {
      state: {
        job: jobName,
        tier: activeTier,
        subject: activeSubject,
        chapter,
        questions: chapterQuestions, // may be null
      },
    });
  };

  if (loading) return <div className="syllabus-container"><p>Loading...</p></div>;
  if (error) return <div className="syllabus-container"><p className="error">{error}</p></div>;

  return (
    <div className="syllabus-container">
      <h1>📚 Your Exam Syllabus</h1>

      <div className="tier-buttons">
        {Object.keys(syllabus || {}).length === 0 ? (
          <p>No syllabus found for this job.</p>
        ) : (
          Object.keys(syllabus || {}).map((tier) => (
            <button
              key={tier}
              className={`tier-btn ${activeTier === tier ? "active" : ""}`}
              onClick={() => {
                setActiveTier(tier);
                const firstSubject = Object.keys(syllabus[tier] || {})[0] || "";
                setActiveSubject(firstSubject);
              }}
            >
              {String(tier).replace(/_/g, " ").toUpperCase()}
            </button>
          ))
        )}
      </div>

      {activeTier && syllabus[activeTier] && (
        <div className="subject-buttons">
          {Object.keys(syllabus[activeTier] || {}).map((subject) => (
            <button
              key={subject}
              className={`subject-btn ${activeSubject === subject ? "active" : ""}`}
              onClick={() => setActiveSubject(subject)}
            >
              {String(subject).replace(/_/g, " ").toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {activeTier && activeSubject && (
        <div className="chapter-buttons">
          {getChapterList().length === 0 ? (
            <p>No chapters found.</p>
          ) : (
            getChapterList().map((chapter, idx) => (
              <button
                key={idx}
                className="chapter-btn"
                onClick={() => handleChapterClick(chapter)}
              >
                {chapter}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Syllabus;

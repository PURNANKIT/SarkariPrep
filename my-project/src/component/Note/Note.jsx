import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Signup from "../pages/Signup";
import "./Note.css";

const ALL_NOTES = [
  {
    id: 1,
    job: "UPSC",
    desc: "Complete UPSC Notes",
    pdf_en: "/notes/upsc_en.pdf",
    pdf_hi: "/notes/upsc_hi.pdf",
  },
  {
    id: 2,
    job: "ssc_cgl",
    desc: "SSC All Tier Notes",
    pdf_en: "/notes/ssc_en.pdf",
    pdf_hi: "/notes/ssc_hi.pdf",
  },
  {
    id: 3,
    job: "Railway",
    desc: "Railway NTPC Notes",
    pdf_en: "/notes/railway_en.pdf",
    pdf_hi: "/notes/railway_hi.pdf",
  },
  {
    id: 4,
    job: "Banking",
    desc: "Bank PO Notes",
    pdf_en:"/notes/bankingR_en.pdf",
    pdf_hi: "/notes/bankingR_hi.pdf",
  },
  {
    id: 5,
    job: "Defence",
    desc: "NDA/CDS Notes",
    pdf_en: "/notes/defence_en.pdf",
    pdf_hi: "/notes/defence_hi.pdf",
  },
  {
    id: 6,
    job: "Police",
    desc: "Police SI/Constable Notes",
    pdf_en: "/notes/police_en.pdf",
    pdf_hi: "/notes/police_hi.pdf",
  },
  {
    id: 7,
    job: "State Exam",
    desc: "State Exam Notes",
    pdf_en: "/notes/state_en.pdf",
    pdf_hi: "/notes/state_hi.pdf",
  },
];

const Note = () => {
  const { user, language } = useUser();
  const [showSignup, setShowSignup] = useState(false);

  const handleSignup = () => setShowSignup(true);

  if (!user && showSignup) {
    return <Signup onClose={() => setShowSignup(false)} />;
  }

  const jobRaw =
    user?.job_preparation ||
    user?.job ||
    user?.selectedJob ||
    user?.preparation;

  const userJob = jobRaw ? String(jobRaw).trim().toLowerCase() : "";

  const filteredNotes = ALL_NOTES.filter((item) =>
    item.job.toLowerCase().includes(userJob)
  );

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          animation: "bgMove 6s ease infinite",
        }}
      >
        <div
          style={{
            padding: "40px 50px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.3)",
            color: "#fff",
            textAlign: "center",
            width: "350px",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <div style={{ fontSize: "70px", marginBottom: "10px" }}>🔒</div>
          <h2 style={{ marginBottom: "10px" }}>Login Required</h2>
          <p style={{ marginBottom: "20px", opacity: 0.9 }}>
            Please login to access the Note Section.
          </p>

          <button
            onClick={handleSignup}
            style={{
              padding: "12px 22px",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "25px",
              fontWeight: "600",
              cursor: "pointer",
              color: "#2575fc",
            }}
          >
            Signup
          </button>
        </div>
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        ❌ No notes found for your selected job: <b>{userJob}</b>
      </h3>
    );
  }

  return (
    <div className="notes-grid">
      {filteredNotes.map((item) => {
        const pdfToOpen = language === "hi" ? item.pdf_hi : item.pdf_en;

        const viewLabel = language === "hi" ? "देखें" : "View";
        const downloadLabel = language === "hi" ? "डाउनलोड करें" : "Download";

        return (
          <div key={item.id} className="note-card">
            <h3 className="note-job">{item.job}</h3>
            <p className="note-desc">{item.desc}</p>

            <div className="action-buttons">
              <a
                href={pdfToOpen}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
              >
                👁 {viewLabel}
              </a>

              <a href={pdfToOpen} download className="download-btn">
                ⬇ {downloadLabel}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Note;

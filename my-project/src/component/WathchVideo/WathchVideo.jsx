import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { useUser } from "../context/UserContext";
import Signup from "../pages/Signup";
import "./WatchVideo.css";

const videosByJob = {
  ssc_cgl: [
    "https://www.youtube.com/embed/N-iFUEYauLQ",
   "https://www.youtube.com/embed/8ywE0PMgwOM",

    "https://www.youtube.com/embed/HBQWDgao6N4",
    "https://www.youtube.com/embed/_8bCJRoB910",
    
  ],

  railway: [
   "https://www.youtube.com/embed/sil2ZDAUqvQ",
   "https://www.youtube.com/embed/2sFxvioUHPc",
   "https://www.youtube.com/embed/7zgPb56AhIY",



  ],

  banking: [
     "https://www.youtube.com/embed/OsSjRzrc1fE",
   "https://www.youtube.com/embed/hMFcNPzPZjk",

    "https://www.youtube.com/embed/K83uBTBwb0c",
    "https://www.youtube.com/embed/oKwxH6kbqNA",
   
  ],

  upsc: [
    "https://www.youtube.com/embed/1Y2QJx3vL8E",
    "https://www.youtube.com/embed/aqz-KE-bpKQ",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/tAGnKpE4NCI",
    "https://www.youtube.com/embed/2vjPBrBU-TM",
    "https://www.youtube.com/embed/HQmmM_qwG4k",
    "https://www.youtube.com/embed/Mv5nHcTZ6Mk",
    "https://www.youtube.com/embed/l482T0yNkeo",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/0NbA8O98SeI",
    "https://www.youtube.com/embed/ZYxdhMAF4F0",
  ],

  other: [],
};

const WatchVideo = () => {
  const { job } = useParams();
  const { user } = useUser();
  const [showSignup, setShowSignup] = useState(false);

  const selectedVideos = videosByJob[job];
  const handleSignup = () => setShowSignup(true);

  // -------------------------
  // SHOW SIGNUP POPUP
  // -------------------------
  if (!user && showSignup) {
    return <Signup onClose={() => setShowSignup(false)} />;
  }

  // -------------------------
  // SAME LOGIN REQUIRED DESIGN AS NOTES.JSX
  // -------------------------
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
            Please login to watch the video lectures.
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

  // -------------------------
  // LOGGED IN — SHOW VIDEOS
  // -------------------------
  return (
    <>
      <Header />

      <div className="video-container">
        <h2>{job.toUpperCase()} – Top Videos</h2>

        {!selectedVideos || selectedVideos.length === 0 ? (
          <p className="no-videos">No videos available.</p>
        ) : (
          <div className="video-grid">
            {selectedVideos.map((url, index) => (
              <div className="video-card" key={index}>
                <iframe
                  src={url}
                  title={`Video ${index}`}
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WatchVideo;

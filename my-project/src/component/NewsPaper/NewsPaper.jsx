import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import "./NewsPaper.css";

const NewsPaper = () => {
  const { language } = useUser();
  const [view, setView] = useState(false);

  // language-wise PDF
  const pdfFile = language === "hi" ? "/News-Paper/hindi-paper.pdf" : "/News-Paper/english-paper.pdf";

  return (
    <div className="np-container">
      <header className="np-header">
        <h1>📰 {language === "hi" ? "आज का अख़बार" : "Today's Newspaper"}</h1>
        <p className="np-sub">
          {language === "hi"
            ? "हिन्दी / English चयन करें"
            : "Select Hindi / English"}
        </p>
      </header>

      <main className="np-main">
        <div className="np-card">
          <div className="np-card-left">
            <h2 className="np-title">
              {language === "hi" ? "1 दिन का अख़बार" : "1 Day Newspaper"}
            </h2>
            <p className="np-meta">
              {language === "hi"
                ? "दिनांक: " + new Date().toLocaleDateString("hi-IN")
                : "Date: " + new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="np-card-right">
            <button
              className="np-btn np-view"
              onClick={() => setView((s) => !s)}
            >
              {view
                ? language === "hi"
                  ? "बंद करें"
                  : "Close"
                : language === "hi"
                ? "देखें"
                : "View"}
            </button>

            <a className="np-btn np-download" href={pdfFile} download>
              {language === "hi" ? "डाउनलोड" : "Download"}
            </a>
          </div>

          <div className="np-flag">{language === "hi" ? "आज" : "TODAY"}</div>
        </div>

        {view && (
          <section className="np-viewer">
            <iframe
              src={pdfFile}
              title="Newspaper PDF"
              width="100%"
              height="720"
              frameBorder="0"
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default NewsPaper;

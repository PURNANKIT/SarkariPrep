import React from "react";
import "./hero.css";
import { useUser } from "../context/UserContext";

export default function Hero({ onOpenSignup }) {
  const [current, setCurrent] = React.useState(0);
  const { user } = useUser(); // ✅ Get logged-in user

  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleStartLearning = () => {
    if (!user) {
      onOpenSignup(); // ✅ Only open signup if user is NOT logged in
    }
  };

  return (
    <div className="hero-container">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      <div className="hero-overlay">
        <h1>E-Learning Platform</h1>
        <p>Learn Anytime, Anywhere with Modern Digital Education</p>

        {/* Button only shows if user is NOT logged in */}
        {!user && (
          <button className="hero-btn" onClick={handleStartLearning}>
            Start Learning
          </button>
        )}
      </div>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active-dot" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

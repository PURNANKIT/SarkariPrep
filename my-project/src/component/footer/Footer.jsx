import React from "react";
import "./footer.css";
import { useUser } from "../context/UserContext";

function Footer() {
  const { user } = useUser();

  // Newsletter subscribe handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.elements.email?.value;
    if (email) {
      alert(`Thanks for subscribing: ${email}`);
      e.target.reset();
    }
  };

  // Prevent video access without login
  const handleVideoNavigation = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please login to watch video lessons!");
    }
  };

  // User job route for videos
  const jobRoute =
    user?.job_preparation ||
    user?.job ||
    user?.selectedJob ||
    user?.preparation ||
    "general";

  return (
    <footer className="footer">
      <div className="container">
        {/* ---------------------- MAIN FOOTER CONTENT ---------------------- */}
        <div className="footer-content">
          {/* -------- Left: Logo & About -------- */}
          <div className="footer-logo">
            <h2>SarkariPrep</h2>
            <p>
              Your premier destination for competitive exam preparation. Stay
              updated with quizzes, current affairs, and study materials.
            </p>

            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* -------- Quick Links -------- */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/news-paper">News Paper</a>
              </li>
              <li>
                <a href="/practice">Practice Tests</a>
              </li>
              <li>
                <a href="/notes">Study Materials</a>
              </li>

              <li>
                <a href={`/videos/${jobRoute}`}>Video Lessons</a>

              </li>
            </ul>
          </div>

          {/* -------- Contact Info -------- */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>
              <i className="fas fa-map-marker-alt"></i> Education Street,
              Learning City, India
            </p>
            <p>
              <i className="fas fa-phone"></i> +91 98765 43210
            </p>
            <p>
              <i className="fas fa-envelope"></i> support@sarkariprep.com
            </p>
          </div>

          {/* -------- Newsletter -------- */}
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe for daily quiz updates & exam tips.</p>

            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* ---------------------- FOOTER BOTTOM ---------------------- */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2025 SarkariPrep. All rights reserved.</p>
          </div>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

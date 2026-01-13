import React, { useState } from "react";
import "./SendNotification.css"; // Import the CSS file

const SendNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [user_id, setUser_id] = useState("all");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message, type, user_id }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse("✅ Notification sent successfully!");
      } else {
        setResponse(`❌ Error: ${data.error}`);
      }

      setTitle("");
      setMessage("");
      setType("info");
      setUser_id("all");

      setTimeout(() => setResponse(""), 3000);
    } catch (error) {
      setResponse("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h2>Send Notification</h2>
      </div>

      <form className="notification-form" onSubmit={handleSend}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter notification title"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            placeholder="Enter notification message"
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option value="info">Select</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
          </select>
        </div>

        <div className="form-group">
          <label>Send To</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            placeholder="User ID or 'all' for everyone"
            className="form-input"
          />
          <span className="hint-text">
            Enter user ID or "all" to send to all users
          </span>
        </div>

        <button type="submit" disabled={loading} className="send-button">
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Sending...
            </>
          ) : (
            "Send Notification"
          )}
        </button>
      </form>

      {response && (
        <div
          className={`response-message ${
            response.includes("❌") ? "response-error" : "response-success"
          }`}
        >
          {response}
        </div>
      )}
    </div>
  );
};

export default SendNotification;

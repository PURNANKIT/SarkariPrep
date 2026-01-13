import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

import "./AdminDashboard.css";

const BASE_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const totalRes = await fetch(`${BASE_URL}/admin/total-users`);
      const verifiedRes = await fetch(`${BASE_URL}/admin/verified-users`);
      const onlineRes = await fetch(`${BASE_URL}/admin/online-users`);

      const totalData = await totalRes.json();
      const verifiedData = await verifiedRes.json();
      const onlineData = await onlineRes.json();

      if (totalData.success) setTotalUsers(totalData.total);
      if (verifiedData.success) setVerifiedUsers(verifiedData.verified);
      if (onlineData.success) setOnlineUsers(onlineData.onlineUsers);
    } catch (err) {
      console.error("Admin stats error:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">📊 Admin Dashboard</h2>

      {/* ✅ TOP STAT CARDS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>Total Users</h3>
          <h1>{totalUsers}</h1>
          <p>All registered users</p>
        </div>

        <div className="stat-card green">
          <h3>Verified Users</h3>
          <h1>{verifiedUsers}</h1>
          <p>Email verified users</p>
        </div>

        <div className="stat-card lime">
          <h3>Online Users</h3>
          <h1>{onlineUsers}</h1>
          <p>Currently active users</p>
        </div>
      </div>

      {/* ✅ DIAGRAM / SIMPLE BAR CHART */}
      {/* ✅ UPGRADED BAR GRAPH */}
      <div className="chart-section">
        <h3>User Activity Overview</h3>

        <div className="bar-chart">
          {/* TOTAL USERS */}
          <div className="bar">
            <span className="bar-label">Total</span>
            <div className="bar-track">
              <div
                className="bar-fill blue"
                style={{ height: `${Math.min(totalUsers * 2, 180)}px` }}
              >
                <span className="bar-value">{totalUsers}</span>
              </div>
            </div>
          </div>

          {/* VERIFIED USERS */}
          <div className="bar">
            <span className="bar-label">Verified</span>
            <div className="bar-track">
              <div
                className="bar-fill green"
                style={{ height: `${Math.min(verifiedUsers * 2, 180)}px` }}
              >
                <span className="bar-value">{verifiedUsers}</span>
              </div>
            </div>
          </div>

          {/* ONLINE USERS */}
          <div className="bar">
            <span className="bar-label">Online</span>
            <div className="bar-track">
              <div
                className="bar-fill lime"
                style={{ height: `${Math.min(onlineUsers * 2, 180)}px` }}
              >
                <span className="bar-value">{onlineUsers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ EXTRA INFO / NOTES */}
      <div className="insight-box">
        <h3>📌 Admin Insights</h3>
        <ul>
          <li>✔ Total users show platform growth</li>
          <li>✔ Verified users improve system security</li>
          <li>✔ Online users show real-time activity</li>
          <li>✔ Auto refresh happens every 5 seconds</li>
        </ul>

        <p className="note-text">
          ⚠️ If online users suddenly drop to 0, it usually means users closed
          the browser without logging out.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;

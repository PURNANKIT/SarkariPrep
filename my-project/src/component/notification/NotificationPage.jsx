import React, { useEffect, useState } from "react";
import "./Notification.css";
import { useUser } from "../context/UserContext";

const BASE_URL = "http://localhost:5000";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user: contextUser } = useUser();
  const storedUser = localStorage.getItem("user");
  const localUser = storedUser ? JSON.parse(storedUser) : null;
  const user = contextUser || localUser;

  useEffect(() => {
    if (!user?.id) return;

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, [user?.id]);

  // ✅ FETCH
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/api/notifications/user/${String(user.id)}`
      );

      const data = await res.json();

      if (data?.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);

        const unread = data.notifications.filter(
          (n) => !n.read_by?.includes(String(user.id))
        ).length;

        setUnreadCount(unread);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ MARK AS READ
  const markAsRead = async (notificationId) => {
    try {
      await fetch(`${BASE_URL}/api/notifications/${notificationId}/read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: String(user.id) }),
      });

      fetchNotifications();
    } catch (error) {
      console.error("❌ Error marking notification as read:", error);
    }
  };

  // ✅ USER NOT LOGGED IN
  if (!user?.id) {
    return (
      <div className="notification-container">
        <h2>Notifications</h2>
        <p>Please login to view notifications</p>
      </div>
    );
  }

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h2>
          Notifications
          {unreadCount > 0 && <span className="badge">{unreadCount} new</span>}
        </h2>

        <div className="notification-actions">
          <button className="refresh-btn" onClick={fetchNotifications}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {loading && <p className="no-notification">Loading...</p>}

      {!loading && notifications.length === 0 ? (
        <p className="no-notification">No notifications yet</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notif) => {
            const isUnread = !notif.read_by?.includes(String(user.id));

            return (
              <div
                key={notif.id}
                className={`notification-item ${isUnread ? "unread" : "read"}`}
                onClick={() => markAsRead(notif.id)}
              >
                <h3>{notif.title || "No Title"}</h3>
                <p>{notif.message || "No Message"}</p>

                <small>
                  {notif.created_at
                    ? new Date(notif.created_at).toLocaleString()
                    : "Time not available"}
                </small>

                {isUnread && <span className="unread-dot">●</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;

// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Using hardcoded endpoint (or change to Render JSON server URL if deployed)
    axios
      .get("http://localhost:3001/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  return (
    <div>
      <h4>🔔 Notifications</h4>
      <ul>
        {notifications.length === 0 ? (
          <li>No notifications</li>
        ) : (
          notifications.map((note) => <li key={note.id}>{note.msg}</li>)
        )}
      </ul>
    </div>
  );
};

export default Notifications;

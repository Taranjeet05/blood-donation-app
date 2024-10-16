"use client";

import React, { useEffect, useState } from 'react';
import styles from './Notifications.module.css'; 

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setNotifications(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error fetching notifications: {error}</div>;

  return (
    <div className={styles.notificationsContainer}>
      <h2 className={styles.notificationsTitle}>Your Notifications</h2>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification._id} className={styles.notificationItem}>
              <span className={styles.notificationMessage}>{notification.message}</span>
              <span className={styles.notificationTime}>
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <li>No notifications available.</li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;

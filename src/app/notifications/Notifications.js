// Mark this component as a Client Component
"use client";

import React, { useEffect, useState } from 'react';
import styles from './Notifications.module.css'; // Import the CSS module

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

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

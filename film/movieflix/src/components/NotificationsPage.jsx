import React from 'react';
import './NotificationsPage.css';

const NotificationsPage = ({ 
  notifications, 
  onBack
}) => {
  const sampleNotifications = [
    {
      id: 1,
      title: "Welcome to MovieFlix!",
      message: "Start watching unlimited movies and TV shows.",
      time: "Just now",
      read: false,
      type: "welcome"
    },
    {
      id: 2,
      title: "New Release Alert",
      message: "Dune: Part Two is now available to watch!",
      time: "2 hours ago",
      read: false,
      type: "new_release"
    },
    {
      id: 3,
      title: "Recommended for You",
      message: "Based on your viewing history, we think you'll love 'The Batman'",
      time: "1 day ago",
      read: true,
      type: "recommendation"
    }
  ];

  const displayNotifications = notifications.length > 0 ? notifications : sampleNotifications;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_release':
        return 'fas fa-film';
      case 'recommendation':
        return 'fas fa-star';
      case 'welcome':
        return 'fas fa-heart';
      default:
        return 'fas fa-bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'new_release':
        return '#e50914';
      case 'recommendation':
        return '#ffd700';
      case 'welcome':
        return '#00b894';
      default:
        return '#0984e3';
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <div className="header-content">
          <h1>Notifications</h1>
        </div>
      </div>

      <div className="notifications-content">
        {displayNotifications.length === 0 ? (
          <div className="empty-notifications">
            <i className="fas fa-bell-slash"></i>
            <h2>No notifications yet</h2>
            <p>When you get notifications, they'll appear here</p>
          </div>
        ) : (
          <div className="notifications-list">
            {displayNotifications.map(notification => (
              <div 
                key={notification.id} 
                className="notification-item"
                style={{ borderLeftColor: getNotificationColor(notification.type) }}
              >
                <div className="notification-icon" style={{ backgroundColor: getNotificationColor(notification.type) }}>
                  <i className={getNotificationIcon(notification.type)}></i>
                </div>
                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
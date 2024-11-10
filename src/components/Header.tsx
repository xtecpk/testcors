import { useState } from 'react';
import { FaShoppingCart, FaBell } from 'react-icons/fa';
import Notification from './notifications/Notification';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { title: 'New Task Assigned', message: 'You have been assigned a new task: Update the documentation.' },
    { title: 'Purchase Request Approved', message: 'Your purchase request has been approved.' },
    { title: 'Server Maintenance', message: 'Scheduled server maintenance on November 5th at 2 AM.' },
    { title: 'Weekly Standup Reminder', message: 'Don’t forget the weekly standup meeting tomorrow at 10 AM.' },
    { title: 'Weekly Standup Reminder', message: 'Don’t forget the weekly standup meeting tomorrow at 10 AM.' },
    { title: 'Weekly Standup Reminder', message: 'Don’t forget the weekly standup meeting tomorrow at 10 AM.' },
    { title: 'Weekly Standup Reminder', message: 'Don’t forget the weekly standup meeting tomorrow at 10 AM.' },
    { title: 'Weekly Standup Reminder', message: 'Don’t forget the weekly standup meeting tomorrow at 10 AM.' }
  ]);

  const handleNotificationToggle = () => {
    setIsNotificationOpen(prevState => !prevState); // Toggle the notification dropdown
  };

  const handleNotificationClose = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index)); // Remove a specific notification
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
      <div>Welcome aboard! | HMS Black Widow, M/Y</div>

      <div className="d-flex align-items-center">
        <div className="position-relative me-3">
          <FaShoppingCart size={20} />
        </div>

        <div className="position-relative me-3" onClick={handleNotificationToggle} style={{ cursor: 'pointer' }}>
          <FaBell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {notifications.length}
          </span>
        </div>

        <div className="d-flex align-items-center">
          <span className="me-2">Fahad Ahmad</span>
          <img
            src="https://images.unsplash.com/photo-1684966610091-f6beda2d025a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User"
            className="rounded-circle"
            style={{ width: '40px', height: '40px' }}
          />
        </div>
      </div>

      {/* Notification dropdown component */}
      {isNotificationOpen && (
        <div className="position-absolute" style={{ top: '60px', right: '20px', zIndex: 1000 }}>
          <Notification notifications={notifications} onClose={handleNotificationClose} />
        </div>
      )}
    </header>
  );
};

export default Header;

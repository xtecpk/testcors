import { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaBell } from 'react-icons/fa';
import Notification from './notifications/Notification';
import Logout from './authencation/logout/Logout';

const Header: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { title: 'New Task Assigned', message: 'You have been assigned a new task: Update the documentation.' },
    { title: 'Purchase Request Approved', message: 'Your purchase request has been approved.' },
    { title: 'Server Maintenance', message: 'Scheduled server maintenance on November 5th at 2 AM.' },
    { title: 'Weekly Standup Reminder', message: 'Don’t forget the weekly standup meeting tomorrow at 10 AM.' },
  ]);

  const logoutModalRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null); // Reference for the profile image

  // Toggle the notification dropdown
  const handleNotificationToggle = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  // Remove a specific notification
  const handleNotificationClose = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all user data and redirect to login
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    window.location.href = '/login';
  };

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutModalRef.current && !logoutModalRef.current.contains(event.target as Node) &&
        profileRef.current && !profileRef.current.contains(event.target as Node)
      ) {
        setIsLogoutOpen(false); // Close the modal when clicking outside
      }
    };

    // Add event listener
    document.addEventListener('click', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
      <div>Welcome aboard! | HMS Black Widow, M/Y</div>

      <div className="d-flex align-items-center">
        {/* Shopping Cart Icon */}
        <div className="position-relative me-3">
          <FaShoppingCart size={20} />
        </div>

        {/* Notifications Icon */}
        <div
          className="position-relative me-3"
          onClick={handleNotificationToggle}
          style={{ cursor: 'pointer' }}
        >
          <FaBell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {notifications.length}
          </span>
        </div>

        {/* User Info and Logout */}
        <div className="d-flex align-items-center" ref={profileRef}>
          <span className="me-2">Fahad Ahmad</span>
          <img
            src="https://images.unsplash.com/photo-1684966610091-f6beda2d025a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User"
            className="rounded-circle"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            onClick={() => setIsLogoutOpen(true)}
          />
        </div>
      </div>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="position-absolute" style={{ top: '60px', right: '20px', zIndex: 1000 }}>
          <Notification notifications={notifications} onClose={handleNotificationClose} />
        </div>
      )}

      {/* Logout Modal */}
      {isLogoutOpen && (
        <div
          ref={logoutModalRef} // Reference to the logout modal
          id="logoutModal"
          className="position-absolute m-3"
          style={{ top: '50px', right: '10px', zIndex: 1000 }}
        >
          <Logout logout={handleLogout} closeModal={() => setIsLogoutOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;

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
  const [username, setUsername] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  const logoutModalRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Fetch user data from localStorage and user avatar
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token'); // If authentication is required
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.name || '');
        
        // Fetch the avatar if `parsedUser.avatar` exists
        if (parsedUser.avatar) {
          const avatarURL = `https://nieucore.com/backend/private/user/${parsedUser.avatar}`;
          
          fetch(avatarURL, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(response => {
            if (!response.ok) {
              console.error(`Failed to fetch avatar: ${response.status} ${response.statusText}`);
              throw new Error('Failed to fetch avatar');
            }
            return response.blob();
          })
          .then(blob => {
            setAvatar(URL.createObjectURL(blob));
          })
          .catch(error => {
            console.error('Error fetching avatar:', error.message);
          });
          
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.warn('User data not found in local storage');
    }
  }, []); // Runs once when the component mounts
  
  // Clean up the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);
   

  const handleNotificationToggle = () => {
    setIsNotificationOpen(prevState => !prevState);
  };

  const handleNotificationClose = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutModalRef.current && !logoutModalRef.current.contains(event.target as Node) &&
        profileRef.current && !profileRef.current.contains(event.target as Node)
      ) {
        setIsLogoutOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
      <div>Welcome aboard! | HMS Black Widow, M/Y</div>
      <div className="d-flex align-items-center mx-2">
        <div className="position-relative me-3">
          <FaShoppingCart size={20} />
        </div>
        <div className="position-relative me-3 mx-2" onClick={handleNotificationToggle} style={{ cursor: 'pointer' }}>
          <FaBell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {notifications.length}
          </span>
        </div>
        <div className="d-flex align-items-center mx-2" ref={profileRef}>
          <span className="me-2">{username}</span>
          {avatar && (
            <img
              src={avatar}
              className="rounded-circle w-10 h-10 cursor-pointer object-contain"
              onClick={() => setIsLogoutOpen(true)}
              crossOrigin="anonymous"
              alt={`${username}'s avatar`}
            />
          )}
        </div>
      </div>
      {isNotificationOpen && (
        <div className="position-absolute" style={{ top: '60px', right: '20px', zIndex: 1000 }}>
          <Notification notifications={notifications} onClose={handleNotificationClose} />
        </div>
      )}
      {isLogoutOpen && (
        <div
          ref={logoutModalRef}
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

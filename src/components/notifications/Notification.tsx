import React from 'react';

interface NotificationProps {
  notifications: { title: string; message: string }[];
  onClose: (index: number) => void;
}

const Notification: React.FC<NotificationProps> = ({ notifications, onClose }) => {
  return (
    <div
      className="border rounded shadow-lg bg-white"
      style={{ width: '300px', maxHeight: '400px', overflowY: 'auto', padding: '10px' }}
    >
      {notifications.length === 0 ? (
        <div className="p-3 text-center text-muted">No notifications</div>
      ) : (
        notifications.map((notification, index) => (
          <div key={index} className="border-bottom p-2">
            <div className="d-flex justify-content-between align-items-start">
              <strong>{notification.title}</strong>
              <button
                type="button"
                onClick={() => onClose(index)}
                className="btn-close"
                aria-label="Close"
                style={{ fontSize: '12px', marginLeft: '10px', cursor: 'pointer' }}
              ></button>
            </div>
            <p className="mb-0 text-muted" style={{ fontSize: '12px', marginTop: '5px' }}>
              {notification.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;

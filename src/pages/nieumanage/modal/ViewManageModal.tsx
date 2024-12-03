import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UpdateUserModal from './UpdateUserModal'; // Import the new modal component

interface User {
  employeeid: string | null;
  name: string | null;
  role: string | null;
  workemail: string | null;
  phone: string | null;
  status: string | null;
  avatar: string | null;
}

interface ViewManageProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
}

const ViewManageModal: React.FC<ViewManageProps> = ({ show, onHide, user }) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  if (!show) {
    return null;
  }

  if (!user) {
    return (
      <div className="text-center p-4">
        <h2 className="font-bold">No user data available.</h2>
      </div>
    );
  }

  // Generate the avatar URL
  const avatar = user.avatar
    ? `https://nieucore.com/backend/${user.avatar}`
    : 'https://nieucore.com/backend/uploads/public/images/default-avatar.png';

  const handleUpdateButtonClick = () => {
    setIsUpdateModalVisible(true);
  };

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden={!show}
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-full flex justify-center items-center"
    >
      <div className="relative w-full max-w-2xl h-auto p-4 bg-white rounded-lg shadow-md">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
          onClick={onHide}
        >
          <span className="sr-only">Close</span>
          <i className="fa fa-times text-black"></i>
        </button>
        <div className="space-y-4 overflow-y-auto">
          <h2 className="text-center text-lg font-bold">User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-center items-center">
              <div>
                <strong>Avatar:</strong>
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="rounded-full mt-2 w-48 h-48 object-contain"
                  crossOrigin="anonymous" // Ensures cross-origin requests are allowed if needed
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div><strong>Employee ID:</strong> {user.employeeid || 'N/A'}</div>
              <div><strong>Name:</strong> {user.name || 'N/A'}</div>
              <div><strong>Role:</strong> {user.role || 'N/A'}</div>
              <div><strong>Email:</strong> {user.workemail || 'N/A'}</div>
              <div><strong>Phone:</strong> {user.phone || 'N/A'}</div>
              <div><strong>Status:</strong> {user.status || 'N/A'}</div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleUpdateButtonClick}
              className="bg-green-500 w-48 p-2 rounded-lg text-white font-semibold hover:bg-green-600 transition"
            >
              Update User Details
            </button>
          </div>
        </div>
      </div>

      {isUpdateModalVisible && (
        <UpdateUserModal
          show={isUpdateModalVisible}
          onHide={() => setIsUpdateModalVisible(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default ViewManageModal;

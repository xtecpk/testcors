import React, { useState } from 'react';

interface User {
  employeeid: string | null;
  name: string | null;
  role: string | null;
  workemail: string | null;
  phone: string | null;
  status: string | null;
  avatar: string | null;
}

interface UpdateUserModalProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ show, onHide, user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    role: user?.role || '',
    workemail: user?.workemail || '',
    phone: user?.phone || '',
    status: user?.status || '',
    avatar: user?.avatar || '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file.name }); // Just the name for now, or you can use a file uploader
      setAvatarPreview(URL.createObjectURL(file)); // Preview the selected file
    }
  };

  const handleSubmit = () => {
    console.log('Updated User Data:', formData);
    // Implement the logic to save the updated user data (e.g., API call)
    onHide(); // Close the modal after submitting
  };

  if (!show) {
    return null;
  }

  return (
    <div
      id="update-user-modal"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-full flex justify-center items-center"
    >
      <div className="relative w-full max-w-4xl h-auto p-4 bg-white rounded-lg shadow-md">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
          onClick={onHide}
        >
          <span className="sr-only">Close</span>
          <i className="fa fa-times text-black"></i>
        </button>
        <div className="space-y-0">
          <h2 className="text-center text-lg font-bold mb-1">Update User Details</h2>
          {/* Avatar display */}
          <div className="flex justify-center">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="rounded-full w-48 h-48 object-contain mb-2"
                crossOrigin="anonymous"
              />
            ) : (
              <img
                src={user?.avatar ? `https://nieucore.com/backend/${user.avatar}` : 'https://nieucore.com/backend/uploads/public/images/default-avatar.png'}
                alt="Current Avatar"
                className="rounded-full w-40 h-40 object-contain "
                crossOrigin="anonymous"
              />
            )}
          </div>
          <form className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[#000] pt-2 pb-2 fw-bold">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control input"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] pt-2 pb-2 fw-bold">Role:</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control input"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] pt-2 pb-2 fw-bold">Email:</label>
              <input
                type="email"
                name="workemail"
                value={formData.workemail}
                onChange={handleChange}
                className="form-control input"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] pt-2 pb-2 fw-bold">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control input"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] pt-2 pb-2 fw-bold">Status:</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control input"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] pt-2 pb-2 fw-bold">Change Avatar:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="form-control input"
              />
            </div>
          </form>
          <div className='text-center mt-1 flex justify-center'>
            <button
              type="button"
              onClick={handleSubmit}
              className="green w-48 p-2 px-40 rounded-lg text-white font-semibold inter my-3"
            >
              Save Changes
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;

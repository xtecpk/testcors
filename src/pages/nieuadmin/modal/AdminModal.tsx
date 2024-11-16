import React, { useState } from "react";
import axios from "axios";

interface AdminModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ show, onHide }) => {
  const [userName, setUserName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!userName || !role || !email) {
      setError("All fields are required");
      return;
    }

    setError(null);

    const data = { userName, role, email };

    try {
      await axios.post("YOUR_API_ENDPOINT", data);
      setUserName("");
      setRole("");
      setEmail("");
    } catch (error) {
      console.error("Failed to submit data:", error);
      setError("Failed to submit data. Please try again.");
    }
  };

  return (
    <>
      {show && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={onHide}
        >
          <div
            className="relative p-4 w-[650px] rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal body */}
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <div className="p-4">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  User Name:
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control input"
                  placeholder="Enter user name"
                />
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Role:
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control input"
                  placeholder="Enter role"
                />
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control input"
                  placeholder="Enter email"
                />
              </div>
              {error && <div className="text-danger text-center mt-2">{error}</div>}
              <div className="text-center mt-3">
                <button
                  className="blue w-52 p-2 px-40 rounded-lg text-white mb-3 font-semibold inter"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminModal;

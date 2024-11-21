import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance"; // Import the configured axios instance
import { AxiosError } from "axios";

interface AddManageProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const AddManage: React.FC<AddManageProps> = ({ show, onHide }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [personalEmail, setPersonalEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle avatar (file input) change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  // Submit form data to the API
  const handleSubmit = async () => {
    const formData = new FormData(); // Use FormData to handle multipart/form-data
    formData.append("name", userName);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("email", email);
    formData.append("employeeid", employeeId);
    formData.append("personalemail", personalEmail);
    formData.append("phone", phone);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      // Make the API request using axiosInstance
      const response = await axiosInstance.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set proper content type
        },
      });
      console.log("User registered successfully:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      // Handle errors using AxiosError
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("API Error:", error.response);
          setError(`Server Error: ${error.response.data?.message || "An error occurred."}`);
        } else {
          console.error("Network Error:", error.message);
          setError("Network error, please check your connection.");
        }
      } else {
        console.error("Unexpected Error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
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
            className="relative p-4 w-[1000px] rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <div className="p-4">
                <div className="row">
                  <div className="col">
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
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Password:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control input"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
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
                  </div>
                  <div className="col">
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
                </div>
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Employee ID:
                    </label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="form-control input"
                      placeholder="Enter employee ID"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Personal Email:
                    </label>
                    <input
                      type="email"
                      value={personalEmail}
                      onChange={(e) => setPersonalEmail(e.target.value)}
                      className="form-control input"
                      placeholder="Enter personal email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Phone:
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control input"
                      placeholder="Enter phone"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Avatar:
                    </label>
                    <input
                      type="file"
                      onChange={handleAvatarChange}
                      className="form-control input"
                    />
                  </div>
                </div>
              </div>
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

export default AddManage;

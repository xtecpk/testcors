import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { AxiosError } from "axios";

interface AddManageProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const AddManage: React.FC<AddManageProps> = ({ show, onHide }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [personalEmail, setPersonalEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

// Submit form data to the API
const handleSubmit = async () => {
  const formData = new FormData(); 
  formData.append("name", name);
  formData.append("password", password);
  formData.append("role", role);
  formData.append("employeeid", employeeId);
  formData.append("personalemail", personalEmail);
  formData.append("phone", phone);
  if (avatar) {
    formData.append("avatar", avatar); // Append avatar if it exists
  }

  try {
    // API call using axiosInstance
    const { data } = await axiosInstance.post("auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set Content-Type explicitly
      },
    });

    // Use the response data
    console.log("User registered successfully:", data);

    // Show success alert
    alert("User registered successfully!");

    // Clear form fields
    setName("");
    setPassword("");
    setRole("");
    setEmployeeId("");
    setPersonalEmail("");
    setPhone("");
    setAvatar(null);
    setError(null);
  } catch (error) {
    // Handle errors globally and locally
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        setError(error.response.data?.message || "An error occurred.");
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <div className="p-4">
                {/* Input fields */}
                <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control input"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Password:</label>
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
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Role:</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control input"
                      placeholder="Enter role"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Employee ID:</label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="form-control input"
                      placeholder="Enter employee ID"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Personal Email:</label>
                    <input
                      type="email"
                      value={personalEmail}
                      onChange={(e) => setPersonalEmail(e.target.value)}
                      className="form-control input"
                      placeholder="Enter personal email"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Phone:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control input"
                      placeholder="Enter phone"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Avatar:</label>
                    <input
                      type="file"
                      onChange={handleAvatarChange}
                      className="form-control input"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-1">
                <button
                  className="green w-48 p-2 px-40 rounded-lg text-white font-semibold inter my-3"
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

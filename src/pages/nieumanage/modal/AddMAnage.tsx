import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { AxiosError } from "axios";
import { Oval } from "react-loader-spinner";

interface AddManageProps {
  show: boolean;
  onHide: () => void; // Simplified onHide type
}

const AddManage: React.FC<AddManageProps> = ({ show, onHide }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("Admin");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [personalEmail, setPersonalEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!avatar) {
      setError("Please upload an avatar before submitting.");
      return;
    }
    if (!/^\d{12}$/.test(phone)) {
      setError("Phone number must be exactly 12 digits.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Register the user
      const userResponse = await axiosInstance.post("auth/register", {
        name,
        password,
        role,
        employeeid: employeeId,
        personalemail: personalEmail,
        phone,
      });

      const userId = userResponse.data.profile.userId;

      // Step 2: Upload the avatar
      const avatarFormData = new FormData();
      avatarFormData.append("folderType", "public");
      avatarFormData.append("category", "images");
      avatarFormData.append("file", avatar);
      avatarFormData.append("userId", userId);

      const avatarResponse = await axiosInstance.post(
        "uploads/upload/",
        avatarFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const avatarPath = avatarResponse.data?.file?.path;

      if (avatarPath && userId) {
        // Step 3: Update the user with the avatar path
        await axiosInstance.patch(`user/updateuser`, {
          userId: userId,
          avatar: avatarPath,
        });

        alert("User created successfully!");
        onHide(); // Close the modal
      } else {
        setError("Avatar path or user ID is missing.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message ||
          "An error occurred. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
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
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <form method="post" className="p-4">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Oval
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <>
                    {/* Input fields */}
                    <div className="row">
                      <div className="col">
                        <label className="text-[#000] pt-2 pb-2 fw-bold">
                          Name:
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control input"
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="col">
                        <label className="text-[#000] pt-2 pb-2 fw-bold">
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
                        <label className="text-[#000] pt-2 pb-2 fw-bold">
                          Role:
                        </label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="form-control input"
                        >
                          <option value="Admin">Admin</option>
                          {/* Add more roles if needed */}
                        </select>
                      </div>
                      <div className="col">
                        <label className="text-[#000] pt-2 pb-2 fw-bold">
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
                    </div>

                    <div className="row">
                      <div className="col">
                        <label className="text-[#000] pt-2 pb-2 fw-bold">
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
                      <div className="col">
                        <label className="text-[#000] pt-2 pb-2 fw-bold">
                          Phone:
                        </label>
                        <input
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control input"
                          placeholder="Enter 12-digit phone number"
                          maxLength={12}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <label className="text-[#000] pt-2 pb-2 fw-bold">
                          Avatar:
                        </label>
                        <input
                          type="file"
                          onChange={handleAvatarChange}
                          className="form-control input"
                        />
                      </div>
                    </div>
                  </>
                )}
              </form>

              {!loading && (
                <div className="text-center mt-1">
                  <button
                    className="green w-48 p-2 px-40 rounded-lg text-white font-semibold inter my-3"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddManage;

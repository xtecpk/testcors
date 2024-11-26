import React, { useState } from "react";
import axios from "axios";

interface LockerProductModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const LockerProductModal: React.FC<LockerProductModalProps> = ({ show, onHide }) => {
  const [name, setName] = useState<string>("");
  const [labelType, setLabelType] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !labelType || !type) {
      setError("All fields are required");
      return;
    }

    setError(null);

    const data = { name, labelType, type };

    try {
      await axios.post("YOUR_API_ENDPOINT", data);
      setName("");
      setLabelType("");
      setType("");
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
              <div className="p-4 text-start">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Name"
                />
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Label Type:
                </label>
                <input
                  type="text"
                  value={labelType}
                  onChange={(e) => setLabelType(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Label Type"
                />
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Type:
                </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Type"
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

export default LockerProductModal;

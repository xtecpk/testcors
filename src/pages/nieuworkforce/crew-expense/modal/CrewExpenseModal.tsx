import React, { useState } from "react";
import axiosInstance from "../../../../axiosInstance"; // Import Axios instance

interface CrewExpenseModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const CrewExpenseModal: React.FC<CrewExpenseModalProps> = ({ show, onHide }) => {
  const [name, setName] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [nextCertificationExpiry, setNextCertificationExpiry] = useState<string>("");
  const [leaveDay, setLeaveDay] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Form validation
    if (!name || !rank || !department || !status || !nextCertificationExpiry || !leaveDay) {
      setError("All fields are required.");
      return;
    }

    setError(null); 
    const data = { name, rank, department, status, nextCertificationExpiry, leaveDay };

    try {
      await axiosInstance.post("/crew-staff", data); // Use Axios instance for API call
      setName("");
      setRank("");
      setDepartment("");
      setStatus("");
      setNextCertificationExpiry("");
      setLeaveDay("");
    } catch (err) {
      console.error("Failed to submit data:", err);
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
            className="relative p-4 w-[900px] rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <div className="p-4 text-start">
                <div className="row">
                  <div className="col">
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
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Rank:
                    </label>
                    <input
                      type="text"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="form-control input"
                      placeholder="Enter Rank"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Department:
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="form-control input"
                      placeholder="Enter Department"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Status:
                    </label>
                    <input
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-control input"
                      placeholder="Enter Status"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Next Certification Expiry:
                    </label>
                    <input
                      type="date"
                      value={nextCertificationExpiry}
                      onChange={(e) => setNextCertificationExpiry(e.target.value)}
                      className="form-control input"
                      placeholder="Enter Next Certification Expiry"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Leave Day:
                    </label>
                    <input
                      type="text"
                      value={leaveDay}
                      onChange={(e) => setLeaveDay(e.target.value)}
                      className="form-control input"
                      placeholder="Enter Leave Day"
                    />
                  </div>
                </div>
              </div>
              {error && (
                <div className="text-danger text-center mt-2">{error}</div>
              )}
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
  )
}

export default CrewExpenseModal
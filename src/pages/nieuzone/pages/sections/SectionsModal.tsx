import React, { useState } from "react";
import axios from "axios";

interface NieusetModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const SectionsModal: React.FC<NieusetModalProps> = ({ show, onHide }) => {
  const [vesselID, setVesselID] = useState<string>("");
  const [registoryNo, setRegistoryNo] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [homePort, setHomePort] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!vesselID || !registoryNo || !length || !width || !homePort ) {
      setError("All fields are required");
      return;
    }

    setError(null);

    const data = { vesselID, registoryNo, length, width, homePort};

    try {
      await axios.post("YOUR_API_ENDPOINT", data);
      setVesselID("");
      setRegistoryNo("");
      setLength("");
      setWidth("");
      setHomePort("");
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
            className="relative p-4 w-[1000px] rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal body */}
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <div className="p-4 text-start">
                <div className="row"><div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Deck:
                </label>
                <input
                  type="text"
                  value={vesselID}
                  onChange={(e) => setVesselID(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Deck"
                /></div>
                <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Name:
                </label>
                <input
                  type="text"
                  value={registoryNo}
                  onChange={(e) => setRegistoryNo(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Name"
                /></div></div>
                <div className="row"><div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Incharge:
                </label>
                <input
                  type="text"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Incharge"
                /></div>
                <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Crew:
                </label>
                <input
                  type="text"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Crew"
                /></div></div>
                <div className="row"><div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Add AG Layout:
                </label>
                <input
                  type="file"
                  value={homePort}
                  onChange={(e) => setHomePort(e.target.value)}
                  className="form-control input"
                  placeholder="Enter AG Layout"
                /></div>
                </div>
                
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

export default SectionsModal;

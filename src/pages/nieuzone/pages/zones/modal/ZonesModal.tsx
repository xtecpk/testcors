import React, { useState } from "react";
import axios from "axios";

interface ZonesModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const ZonesModal: React.FC<ZonesModalProps> = ({ show, onHide }) => {
  const [zoneID, setZoneID] = useState<string>("");
  const [zoneName, setZoneName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [items, setItems] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!zoneID || !zoneName || !department || !items ) {
      setError("All fields are required");
      return;
    }

    setError(null);

    const data = { zoneID, zoneName, department, items };

    try {
      await axios.post("YOUR_API_ENDPOINT", data);
      setZoneID("");
      setZoneName("");
      setDepartment("");
      setItems("");
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
                  Zone ID:
                </label>
                <input
                  type="text"
                  value={zoneID}
                  onChange={(e) => setZoneID(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Zone ID"
                /></div>
                <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Zone Name:
                </label>
                <input
                  type="text"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Zone Name"
                /></div></div>
                <div className="row"><div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Department:
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Department"
                /></div>
                <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Items:
                </label>
                <input
                  type="text"
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Items"
                /></div></div>
                
                
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

export default ZonesModal;

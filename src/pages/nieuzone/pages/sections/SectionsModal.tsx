import React, { useState } from "react";
import axios from "axios";

interface SectionsModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const SectionsModal: React.FC<SectionsModalProps> = ({ show, onHide }) => {
  const [deck, setDeck] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [incharge, setIncharge] = useState<string>("");
  const [crew, setCrew] = useState<string>("");
  const [agLayout, setAgLayout] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!deck || !name || !incharge || !crew || !agLayout ) {
      setError("All fields are required");
      return;
    }

    setError(null);

    const data = { deck, name, incharge, crew, agLayout};

    try {
      await axios.post("YOUR_API_ENDPOINT", data);
      setDeck("");
      setName("");
      setIncharge("");
      setCrew("");
      setAgLayout("");
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
                  value={deck}
                  onChange={(e) => setDeck(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Deck"
                /></div>
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
                /></div></div>
                <div className="row"><div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Incharge:
                </label>
                <input
                  type="text"
                  value={incharge}
                  onChange={(e) => setIncharge(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Incharge"
                /></div>
                <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Crew:
                </label>
                <input
                  type="text"
                  value={crew}
                  onChange={(e) => setCrew(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Crew"
                /></div></div>
                <div className="row"><div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Add AG Layout:
                </label>
                <input
                  type="file"
                  value={agLayout}
                  onChange={(e) => setAgLayout(e.target.value)}
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

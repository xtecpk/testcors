import React, { useState } from "react";
import axios from "axios";

interface StoreModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const StoreModal: React.FC<StoreModalProps> = ({ show, onHide }) => {
  const [name, setName] = useState<string>("");
  const [products, setProducts] = useState<string>("");
  const [deck, setDeck] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [alerts, setAlerts] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [request, setRequest] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !products || !deck || !section || !alerts || !capacity ||!request ) {
      setError("All fields are required");
      return;
    }

    setError(null);

    const data = { name, products,deck,section, alerts, capacity, request };

    try {
      await axios.post("YOUR_API_ENDPOINT", data);
      setName("");
      setProducts("");
      setDeck("");
      setSection("");
      setAlerts("");
      setCapacity("");
      setRequest("");
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
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Name"
                /></div>
                <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Products:
                </label>
                <input
                  type="text"
                  value={products}
                  onChange={(e) => setProducts(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Products"
                /></div></div>
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
                  Section:
                </label>
                <input
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Section"
                /></div></div>
                <div className="row"><div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Alerts:
                </label>
                <input
                  type="text"
                  value={alerts}
                  onChange={(e) => setAlerts(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Alerts"
                /></div>
                <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                Capacity m³:
                </label>
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="form-control input"
                  placeholder="Enter Capacity m³"
                /></div></div>
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                  Purchase Request:
                </label>
                <input
                  type="text"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="form-control input "
                  placeholder="Enter Purchase Request"
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

export default StoreModal;

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CrewExpenseRequest from "./CrewExpenseRequest";

interface NewPurchaseRequestProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const NewPurchaseRequest: React.FC<NewPurchaseRequestProps> = ({
  show,
  onHide,
}) => {
  const [showCrewExpenseRequest, setShowCrewExpenseRequest] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Select Purchase Request Type:"
  );

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);

    if (option === "Crew Expense") {
      setShowCrewExpenseRequest(true);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === "Select Purchase Request Type:") {
      alert("Please select a purchase request type.");
      return;
    }

    if (selectedOption === "Crew Expense") {
      setShowCrewExpenseRequest(true);
    } else {
      console.log("Proceed with:", selectedOption);
    }
  };

  return (
    <>
      {show && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={onHide}
        >
          <div
            className="relative p-4 w-[1000px] rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <h4 className="custom-header text-lg font-bold text-center mb-3">
              New Purchase Request
            </h4>

            <div className="custom-body1 border rounded-lg p-4 overflow-y-auto h-64">
              <p className="my-2">{selectedOption}</p>
              <div className="position-relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="form-control mb-4 d-flex justify-content-between align-items-center"
                >
                  {selectedOption}
                  <img
                    src="./Expand Arrow.png"
                    alt="Expand Arrow"
                    style={{ pointerEvents: "none", color: "#666" }}
                  />
                </button>

                {showDropdown && (
                  <div
                    className="dropdown-menu show w-100  mt-1 border rounded"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      onClick={() =>
                        handleOptionSelect(
                          "Purchase Order (Operational) - (Survey)"
                        )
                      }
                      className="dropdown-item"
                    >
                      Purchase Order (Operational) - (Survey)
                    </div>
                    <div
                      onClick={() => handleOptionSelect("Crew Expense")}
                      className="dropdown-item"
                    >
                      Crew Expense
                    </div>
                    <div
                      onClick={() =>
                        handleOptionSelect("Purchase Order (Consumables)")
                      }
                      className="dropdown-item"
                    >
                      Purchase Order (Consumables)
                    </div>
                    <div
                      onClick={() =>
                        handleOptionSelect("Purchase Order (Maintenance)")
                      }
                      className="dropdown-item"
                    >
                      Purchase Order (Maintenance)
                    </div>
                    <div
                      onClick={() =>
                        handleOptionSelect(
                          "Purchase Order (Emergency / Medical)"
                        )
                      }
                      className="dropdown-item"
                    >
                      Purchase Order (Emergency / Medical)
                    </div>
                    <div
                      onClick={() =>
                        handleOptionSelect(
                          "Purchase Order (Contractors) - (Training) - (Survey)"
                        )
                      }
                      className="dropdown-item"
                    >
                      Purchase Order (Contractors) - (Training) - (Survey)
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-5 mb-10">
              <button
                className="green w-48 p-2 px-20 rounded-lg text-white font-semibold inter mr-4"
                onClick={handleSubmit}
              >
                Processed
              </button>
              <button
                className="dblue w-48 p-2 px-20 rounded-lg text-white font-semibold inter"
                onClick={onHide}
              >
                Back To List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CrewExpenseRequest Modal */}
      {showCrewExpenseRequest && (
        <CrewExpenseRequest
          show={showCrewExpenseRequest}
          onHide={() => setShowCrewExpenseRequest(false)}
        />
      )}
    </>
  );
};

export default NewPurchaseRequest;

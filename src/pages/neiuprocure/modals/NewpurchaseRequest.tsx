// NewPurchaseRequest.js
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrewExpenseRequest from './CrewExpenseRequest';

interface NewPurchaseRequestProps {
  show: boolean;        // 'show' is a boolean
  onHide: () => void;   // 'onHide' is a function with no parameters and no return value
}

const NewPurchaseRequest: React.FC<NewPurchaseRequestProps> = ({ show, onHide }) => {
  const [showCrewExpenseRequest, setShowCrewExpenseRequest] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Purchase Request Type:");

  const handleProceedClick = () => {
    setShowCrewExpenseRequest(true);
    onHide(); 
  };

  const handleCloseCrewExpenseRequest = () => {
    setShowCrewExpenseRequest(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-width">
        <div className="custom-container position-relative w-100 p-3">
          <h4 className="custom-header text-center mb-3">New Purchase Request</h4>

          <div className="custom-body1 border rounded-lg p-4 overflow-y-auto h-52" >
            <p className='my-2'>{selectedOption}</p>
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
                  className="dropdown-menu show w-100 mt-1 border rounded"
                  style={{
                    maxHeight: "200px",
                    zIndex: 1000,
                  }}
                >
                  <div onClick={() => handleOptionSelect("Purchase Order (Operational) - (Survey)")} className="dropdown-item">
                    Purchase Order (Operational) - (Survey)
                  </div>
                  <div onClick={() => handleOptionSelect("Crew Expense")} className="dropdown-item">
                    Crew Expense
                  </div>
                  <div onClick={() => handleOptionSelect("Purchase Order (Consumables)")} className="dropdown-item">
                    Purchase Order (Consumables)
                  </div>
                  <div onClick={() => handleOptionSelect("Purchase Order (Maintenance)")} className="dropdown-item">
                    Purchase Order (Maintenance)
                  </div>
                  <div onClick={() => handleOptionSelect("Purchase Order (Emergency / Medical)")} className="dropdown-item">
                    Purchase Order (Emergency / Medical)
                  </div>
                  <div onClick={() => handleOptionSelect("Purchase Order (Contractors) - (Training) - (Survey)")} className="dropdown-item">
                    Purchase Order (Contractors) - (Training) - (Survey)
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="custom-footer d-flex justify-content-center align-items-center mt-4  m-3 gap-4">
            <Button
              variant="inter fw-bold p-3"
              onClick={handleProceedClick}
              style={{ backgroundColor: "#238600", color: "#fff" }}
            >
              Proceed
            </Button>
            <Button
              variant="inter fw-bold p-3"
              onClick={onHide}
              style={{ backgroundColor: "#860000", color: "#fff" }}
            >
              Back to List
            </Button>
          </div>
        </div>
      </Modal>

      {/* CrewExpenseRequest Modal */}
      {showCrewExpenseRequest && (
        <CrewExpenseRequest show={showCrewExpenseRequest} onHide={handleCloseCrewExpenseRequest} />
      )}
    </>
  );
};

export default NewPurchaseRequest;

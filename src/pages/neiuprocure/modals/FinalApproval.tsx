import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import OrderHistory from './OrderHistory';

interface FinalApprovalProps {
  show: boolean;         // 'show' is a boolean indicating visibility
  onHide: () => void;    // 'onHide' is a function to hide the component/modal
}

const FinalApproval: React.FC<FinalApprovalProps> = ({ show, onHide }) => {


  const[showOrderHistory, setShowOrderHistory] = useState(false);

  const handleApproveClick = () =>{
    setShowOrderHistory(true);
    onHide();
  };

  const handleCloseOrderHistory = () => {
    setShowOrderHistory(false);
  };

  return (
    <>
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="custom-modal-width"
    >
      <div className="custom-container">
        <h4 className="custom-header ubuntu fw-bold">Final Approval And Payment Processing</h4>
        <div className="custom-body">

  <label className="form-label inter fw-bold">Total Payment Amount:</label>
  <input
    type="text"
    className="form-control inter fw-bold text-dark bg-light"
    value="300"

  />


  <label className="form-label inter fw-bold mt-4">Apply Credit Notes:</label>
  

  <div className="input-group mb-2">
    <input
      type="text"
      className="form-control fw-bold inter text-dark bg-light"
      value="Credit Note #CN001 - $50"

    />
    <button className="btn btn-primary inter">Apply</button>
  </div>
  

  <div className="input-group mb-2">
    <input
      type="text"
      className="form-control fw-bold inter text-dark bg-light"
      value="Credit Note #CN002 - $30"

    />
    <button className="btn btn-primary inter rounded-md">Apply</button>
  </div>


  <label className="form-label inter fw-bold mt-4">Final Payment Amount (after applying credits):</label>
  <input
    type="text"
    className="form-control fw-bold text-dark bg-light"
    value="220"

  />


  <div className="card mt-4 bg-light border">
    <div className="card-body" style={{backgroundColor: "#DEDEDE"}}>
      <h6 className="card-title inter fw-bold">Approval Process</h6>
      <p className="card-text inter text-muted mb-0">
        Final approval is required by the Captain or Admin. Once approved, the payment will be processed.
      </p>
    </div>
  </div>
</div>

        <div className="custom-footer d-flex justify-content-center align-items-center mt-4 gap-4">
          <Button variant=" me-2 p-3  inter fw-bold" style={{backgroundColor:"#238600" , color: "#fff", width: "270px"}} onClick={handleApproveClick}>Approve And Process Payment</Button>
          <Button variant=" me-2 p-3  fw-bold inter" style={{ backgroundColor: "#6B6C6B", color: "#fff" }}>Back</Button>
          <Button variant=" me-2 p-3  inter fw-bold" style={{ backgroundColor: "#860000", color: "#fff" }} onClick={onHide}>Cancel</Button>
        </div>
      </div>
    </Modal>

    {/* Modal for Order History */}
    <OrderHistory show={showOrderHistory} onHide={handleCloseOrderHistory} />
  </>
  );
};

export default FinalApproval;

import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import FinalApproval from "./FinalApproval";

interface OrderReviewProps {
  show: boolean; // Define 'show' as a boolean
  onHide: () => void; // Define 'onHide' as a function with no parameters and no return value
}

const OrderReview: React.FC<OrderReviewProps> = ({ show, onHide }) => {
  const [showFinalApproval, setShowFinalApproval] = useState(false);

  const handleProcessClick = () => {
    setShowFinalApproval(true);
    onHide();
  };

  const handleCloseFinalApproval = () => {
    setShowFinalApproval(false);
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
          <h4 className="custom-header">Order Review and Split</h4>
          <div className="custom-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">Select Supplier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">status</th>
                  <td>5</td>
                  <td>$100</td>
                  <td>Supplier A</td>
                  <td>
                    <select className="bg-white border border-black rounded-sm">
                      <option>Supplier A</option>
                      <option>Supplier B</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">status</th>
                  <td>10</td>
                  <td>$200</td>
                  <td>Supplier B</td>
                  <td>
                    <select className="bg-white border border-black rounded-sm">
                      <option className="">Supplier A</option>
                      <option>Supplier B</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="custom-footer d-flex justify-content-center align-items-center mt-4 gap-8">
            <Button
              variant="inter fw-bold me-2 p-3 w-40"
              onClick={handleProcessClick}
              style={{ backgroundColor: "#238600", color: "#fff" }}
            >
              Submit Request
            </Button>
            <Button
              variant="inter fw-bold me-2 p-3 w-40"
              onClick={onHide}
              style={{ backgroundColor: "#860000", color: "#fff" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/*import model final approal */}
      <FinalApproval
        show={showFinalApproval}
        onHide={handleCloseFinalApproval}
      />
    </>
  );
};

export default OrderReview;

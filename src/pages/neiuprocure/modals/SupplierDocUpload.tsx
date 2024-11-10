
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import OrderReview from "./OrderReview";

interface SupplierDocUploadProps {
  show: boolean;         // 'show' is a boolean
  onHide: () => void;    // 'onHide' is a function with no parameters and no return value
}

const SupplierDocUpload: React.FC<SupplierDocUploadProps> = ({ show, onHide }) => {


  const [showOrderReview, setShowOrderReview] = useState(false);

  const handleApproveClick = () => {
    setShowOrderReview(true);
    onHide();
  };

  const handleCloseOrderReview = () =>{
    setShowOrderReview(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        dialogClassName="custom-modal-width"
      ><div className="custom-container">
        <h4 className="custom-header ubuntu fw-bold">
          Document Upload And Supplier Selection
        </h4>
        <div className="custom-body">
          <label className="inter fw-bold text-[#000] text-base">
            Upload Documents (Quotes, Invoices, Credit Notes) :
          </label>
          <input
            style={{ backgroundColor: "#F2F2F2" }}
            type="file"
            className="form-control p-2 mt-1  text-black
              border-[#ccc] border-[2px] w-full inter text-sm fw-bold"
            aria-describedby="file"
          />
          <label className="inter fw-bold text-[#000] text-base">
            Select Prefered Supplier :
          </label>
          <select
            className="form-control mb-4 fw-bold inter"
            style={{
              backgroundColor: "##F2F2F2",
              appearance: "none",
              paddingRight: "2rem",
            }}
          >
            <option className="inter fw-bold">Purchase Order (Operational) - (Survey)</option>
            <option className="inter fw-bold">Crew Expense</option>
            <option className="inter fw-bold">Purchase Order (Consumables)</option>
            <option className="inter fw-bold">Purchase Order (Maintenance)</option>
            <option className="inter fw-bold">Purchase Order (Emergency / Medical)</option>
            <option className="inter fw-bold">
              Purchase Order (Contractors) - (Training) - (Survey)
            </option>
          </select>
          <img
            src="./Expand Arrow.png"
            style={{
              position: "absolute",
              right: "10%",
              top: "59.5%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#666",
            }}
          />
        </div>
        <div className="custom-footer d-flex justify-content-center items-center mt-4 gap-8">
            <Button variant="inter fw-bold me-2 p-3 w-40" onClick={handleApproveClick} style={{backgroundColor:"#238600" , color: "#fff"}}>Proceed</Button>
            <Button variant="inter fw-bold me-2 p-3 w-40" onClick={onHide} style={{backgroundColor:"#860000" , color: "#fff"}}>Back to List</Button>
          </div>
      </div>
      </Modal>

      {/*OrderReview Component Model */}
      <OrderReview show={showOrderReview} onHide={handleCloseOrderReview} />
    </>
  );
}

export default SupplierDocUpload;

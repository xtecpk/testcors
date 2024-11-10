import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import PurchaseOrderEmergency from "./PurchaseOrderEmergency";

interface PurchaseOrderContractorProps {
  show: boolean;          // Define 'show' as a boolean
  onHide: () => void;     // Define 'onHide' as a function with no parameters and no return value
}

const PurchaseOrderContractor: React.FC<PurchaseOrderContractorProps> = ({ show, onHide }) => {

  const [showPurchaseOrderEmergency, setShowPurchaseOrderEmergency] = useState(false);
  
  const handleProcessClick = () =>{
    setShowPurchaseOrderEmergency(true);
    onHide();
  }

  const handleClosePurchaseOrderEmergency = () => {
    setShowPurchaseOrderEmergency(false);
  }


  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        dialogClassName="custom-modal-width"
      >
        <div className="custom-container">
          <h4 className="custom-header ubuntu fw-bold">Purchase Order (Contractors)</h4>
          <div className="custom-body">
            <label className="inter text-[#000] text-base fw-bold">
              Billing Address :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="address"
            />
            <label className="inter text-[#000] text-base fw-bold">
              Delivery Address :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="address"
            />
            <label className="inter text-[#000] text-base fw-bold">
              Supplier :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Budget Code :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Item List (Contractors) :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Vat :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Freight :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Discount :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Travel Cost :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Food Cost :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Hotel Cost :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
            <label className="inter fw-bold text-[#000] text-base">
              Insurance :
            </label>
            <input
              style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="text"
            />
          </div>
          <div className="custom-footer d-flex justify-content-center items-center mt-4 gap-8">
            <Button variant="inter fw-bold me-2 p-3 w-40" onClick={handleProcessClick} style={{backgroundColor:"#238600" , color: "#fff"}}>Proceed</Button>
            <Button variant="inter fw-bold me-2 p-3 w-40"  onClick={onHide} style={{backgroundColor:"#860000" , color: "#fff"}}>Back to List</Button>
          </div>
        </div>
      </Modal>

      {/* Purchase Order (Emergency) */}
      <PurchaseOrderEmergency show={showPurchaseOrderEmergency} onHide={handleClosePurchaseOrderEmergency} />

    </>
  );
}

export default PurchaseOrderContractor;

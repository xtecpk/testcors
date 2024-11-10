import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchaseOrderContractor from "./PurchaseOrderContractor";


interface PurchaseOrdersProps {
  show: boolean;         // Define 'show' as a boolean
  onHide: () => void;    // Define 'onHide' as a function with no parameters and no return value
}

const PurchaseOrders: React.FC<PurchaseOrdersProps> = ({ show, onHide }) => {

 const [showPurchaseOrderContractor, setShowPurchaseOrderContractor] = useState(false);

 const handleProcessClick = () =>{
  setShowPurchaseOrderContractor(true);
  onHide();
 }

 const handleClosePurchaseOrderContractor = () => {
  setShowPurchaseOrderContractor(false);
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
          <h4 className="custom-header ubuntu fw-bold">Purchase Order (Consumable)</h4>
          <div className="custom-body">
            <label className="inter text-[#000] text-base fw-bold">
              Billing Address :
            </label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
            />
            <label className="inter text-[#000] text-base fw-bold">
              Delivery Address :
            </label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="address"
            />
            <label className="inter text-[#000] text-base fw-bold">Budget code :</label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="code"
            />
            <label className="inter text-[#000] text-base fw-bold">Item List:</label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1 h-32 border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="list"
            />
            <label className="inter text-[#000] text-base fw-bold">VAT :</label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="vat"
            />
            <label className="inter text-[#000] text-base fw-bold">Freight :</label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="freight"
            />
            <label className="inter text-[#000] text-base fw-bold">Discount :</label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="discount"
            />
            <label className="inter text-[#000] text-base fw-bold">Exchange Rate:</label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="exchange_rate"
            />
            <label className="inter text-[#000] text-base fw-bold">
              Total in Default Currency
            </label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="currency"
            />
          </div>
          <div className="custom-footer d-flex justify-content-center align-items-center gap-4">
            <Button variant="inter fw-bold me-2 p-3 w-40"onClick={handleProcessClick} style={{backgroundColor:"#238600" , color: "#fff"}}>Submit Request</Button>
            <Button variant="inter fw-bold me-2 p-3 w-40"  onClick={onHide} style={{backgroundColor:"#860000" , color: "#fff"}}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>


      {/**Purchase order constructor component */}
      
      <PurchaseOrderContractor show={showPurchaseOrderContractor} onHide={handleClosePurchaseOrderContractor}  />
    </>
  );
}

export default PurchaseOrders;

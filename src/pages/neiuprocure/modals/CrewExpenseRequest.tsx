import  { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PurchaseOrders from './PurchaseOrderConsumable';

interface CrewExpenseRequestProps {
  show: boolean;        // 'show' is a boolean
  onHide: () => void;   // 'onHide' is a function with no parameters and no return value
}

const CrewExpenseRequest: React.FC<CrewExpenseRequestProps> = ({ show, onHide }) => {




  const [showPurchaseOrders, setShowPurchaseOrders] = useState(false);


  const handleProceedClick = () => {
    setShowPurchaseOrders(true);
    onHide(); 
  };


  const handleCloseCrewExpenseRequest = () => {
    setShowPurchaseOrders(false);
  };


  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        dialogClassName="custom-modal-width"
      >
        <div className="custom-container  w-96">
          <h4 className="custom-header">Crew Expense Request</h4>
          <div className="custom-body1 w-96 ml-8 " >
            <label className="pop text-[#000] text-base fw-bold">Date :</label>
            <input 
              type="date" placeholder='dd/mm/yyyy'
              className="form-control p-2 mt-1  text-black input
              border-[#ccc] border-[2px] w-full inter text-sm fw-bold"
              aria-describedby="date"
            />
            <label className="inter text-[#000] text-base fw-bold">Supplier :</label>
            <input 
              type="text"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
              
            />
            <label className="inter text-[#000] text-base fw-bold">Description :</label>
            <input 
              type="text"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
              
            />
            <label className="inter text-[#000] text-base fw-bold">Budghet Code (Name):</label>
            <input 
              type="text"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
              
            />
            <label className="inter text-[#000] text-base fw-bold">Budget Number :</label>
            <input 
              type="text"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
              
            />
            <label className="inter text-[#000] text-base fw-bold">Receipt Amount :</label>
            <input style={{ backgroundColor: "#F2F2F2" }}
              type="text"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
              
            />
            <label className="inter text-[#000] text-base fw-bold">Currency :</label>
            <input 
              type="text"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
              
            />
            <label className="inter text-[#000] text-base fw-bold">Exchange Rate:</label>
            <input 
              type="text"
              className="form-control p-2 mt-1 input border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
              
            />
            <label className="inter text-[#000] text-base fw-bold">Total in Default Currency</label>
            <input 
              type="text"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="date"
             
            />
            <label className="inter text-[#000] text-base fw-bold">Upload Receipt</label>
            <input 
              type="file"
              className="form-control p-2 mt-1 input  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
              aria-describedby="file"
              
            />
          </div>
          <div className="custom-footer d-flex justify-content-center align-items-center gap-4 w-100 mt-4 ">
            <Button
                className="me-2 p-3 w-40 inter fw-bold"
                onClick={handleProceedClick}
                style={{ backgroundColor: "#238600", color: "#fff" }}
            >
              Submit Request
            </Button>
            <Button
              className="me-2 p-3 w-32 inter fw-bold mr-10"
              onClick={onHide}
              style={{ backgroundColor: "#860000", color: "#fff" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>


       {/* Show CrewExpenseRequest modal when showCrewExpenseRequest is true */}
       <PurchaseOrders show={showPurchaseOrders} onHide={handleCloseCrewExpenseRequest} />
    </>
  );
}

export default CrewExpenseRequest;

import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SupplierDocUpload from './SupplierDocUpload';


interface PurchaseOrderEmergencyProps {
  show: boolean;         // 'show' is a boolean
  onHide: () => void;    // 'onHide' is a function with no parameters and no return value
}

const PurchaseOrderEmergency: React.FC<PurchaseOrderEmergencyProps> = ({ show, onHide }) => {

  const [showSupplierDocUpload, setShowSupplierDocUpload] = useState(false);

  const handleProcessClick = () => {
    setShowSupplierDocUpload(true); 
    onHide(); 
  };

  const handleCloseSupplierDocUpload = () => {
    setShowSupplierDocUpload(false); 
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
                <h4 className='custom-header ubuntu fw-bold'>Purchase Medical (Emergency/Medical)</h4>
                <div className='custom-body'>
                  <label className="inter fw-bold text-[#000] text-base">
                    Billing Address :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Delivery Address :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Supplier :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Budget Code :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Item List (Emergency/Medical) :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    VAT :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter text-[#000] text-base fw-bold">
                    Freight :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Discount :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Urgency Level :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1  border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Emergency/Medical Description :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1 h-28 border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                  <label className="inter fw-bold text-[#000] text-base">
                    Pre-Approval from Medical :
                  </label>
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    className="form-control p-2 mt-1 h-30 border-[#ccc] border-[2px] w-full inter text-sm text-[#000] fw-bold"
                    aria-describedby="address"
                  />
                </div>
                <div className="custom-footer d-flex justify-content-center items-center mt-4 gap-8">
            <Button variant="inter fw-bold me-2 p-3 w-40" onClick={handleProcessClick} style={{backgroundColor:"#238600" , color: "#fff"}}>Proceed</Button>
            <Button variant="inter fw-bold me-2 p-3 w-40" onClick={onHide} style={{backgroundColor:"#860000" , color: "#fff"}}>Back to List</Button>
          </div>
            </div>
        </Modal>

      <SupplierDocUpload show={showSupplierDocUpload} onHide={handleCloseSupplierDocUpload} />
    </>
  )
}

export default PurchaseOrderEmergency
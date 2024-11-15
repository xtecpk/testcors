import { Modal } from "react-bootstrap";


interface PurchaseModalProps {
    show: boolean;
    onHide: () => void;
  }

const PurchaseModal: React.FC<PurchaseModalProps> = ({ show, onHide }) => {
  return (
    <>
        <Modal className=""
      show={show}
      onHide={onHide}
      centered
      dialogClassName="custom-modal-width"
    >
        <div className="custom-container">
            <div className="custom-header text-center">
                <h4 className="ubuntu">Add New Purchases</h4>
            </div>
        </div>
    </Modal>
    </>
  )
}

export default PurchaseModal
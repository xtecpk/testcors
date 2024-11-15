import { Modal } from "react-bootstrap";


interface StoreModalProps {
    show: boolean;
    onHide: () => void;
  }

const StoreModal: React.FC<StoreModalProps> = ({ show, onHide }) => {
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
                <h4 className="ubuntu">Add New Store</h4>
            </div>
        </div>
    </Modal>
    </>
  )
}

export default StoreModal
import { Modal } from "react-bootstrap";


interface AddManageProps {
    show: boolean;
    onHide: () => void;
  }

const LabelModal: React.FC<AddManageProps> = ({ show, onHide }) => {
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
                <h4 className="ubuntu">Add Damage and Defects</h4>
            </div>
        </div>
    </Modal>
    </>
  )
}

export default LabelModal
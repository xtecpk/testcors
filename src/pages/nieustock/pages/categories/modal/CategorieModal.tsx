import { Modal } from "react-bootstrap";


interface CategorieModalProps {
    show: boolean;
    onHide: () => void;
  }

const CategorieModal: React.FC<CategorieModalProps> = ({ show, onHide }) => {
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
                <h4 className="ubuntu">Add New Categorie</h4>
            </div>
        </div>
    </Modal>
    </>
  )
}

export default CategorieModal
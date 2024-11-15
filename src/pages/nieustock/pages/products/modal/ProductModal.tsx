import { Modal } from "react-bootstrap";


interface ProductModalProps {
    show: boolean;
    onHide: () => void;
  }

const ProductModal: React.FC<ProductModalProps> = ({ show, onHide }) => {
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
                <h4 className="ubuntu">Add New Product</h4>
            </div>
        </div>
    </Modal>
    </>
  )
}

export default ProductModal
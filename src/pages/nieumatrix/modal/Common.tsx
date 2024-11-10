import { Modal } from "react-bootstrap";




interface CommonProps{
  show: boolean;
  onHide: () => void;
}


const Common : React.FC<CommonProps> = ({show, onHide}) => {
  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-width">
      <div className="custom-container">
          <div className="custom-header d-flex justify-content-between align-items-center">
            <h4 className='ubuntu text-center align-middle'>Add New Task</h4>
            
          </div>
      </div>
    </Modal>
  )
}

export default Common
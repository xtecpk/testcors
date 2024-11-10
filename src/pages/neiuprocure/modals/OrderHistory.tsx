import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

interface OrderHistoryProps {
  show: boolean; // 'show' is a boolean indicating visibility
  onHide: () => void; // 'onHide' is a function to hide the component/modal
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ show, onHide }) => {


  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/NIEUPROCURE'); // Navigate to Neiuprocure component
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
          <h4 className="custom-header">Order History And Review</h4>
          <div className="custom-body">
          <div className="container">
  <table className="table table-bordered mt-4">
    <thead className="table-light">
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Date</th>
        <th scope="col">Status</th>
        <th scope="col">Supplier</th>
        <th scope="col">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>#PO12345</td>
        <td>2024-08-10</td>
        <td>Completed</td>
        <td>Supplier A</td>
        <td>$500</td>
      </tr>
      <tr>
        <td>#PO12346</td>
        <td>2024-08-10</td>
        <td>Pending</td>
        <td>Supplier B</td>
        <td>$300</td>
      </tr>
    </tbody>
  </table>
  <div className="card bg-light mb-3">
    <div className="card-header fw-bold">Logs for Order #PO12345</div>
    <div className="card-body">
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Order Created</strong>
          <br />
          <small className="text-muted">2024-08-10 09:00 AM</small>
        </li>
        <li className="list-group-item">
          <strong>Approval by HOD</strong>
          <br />
          <small className="text-muted">2024-08-10 11:00 AM</small>
        </li>
        <li className="list-group-item">
          <strong>Final Approval by Captain</strong>
          <br />
          <small className="text-muted">2024-08-10 03:00 PM</small>
        </li>
        <li className="list-group-item">
          <strong>Payment Processed</strong>
          <br />
          <small className="text-muted">2024-08-11 10:00 AM</small>
        </li>
      </ul>
    </div>
  </div>

 
  <div className="card bg-light mb-3">
    <div className="card-header fw-bold">Logs for Order #PO12346</div>
    <div className="card-body">
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Order Created</strong>
          <br />
          <small className="text-muted">2024-08-10 09:00 AM</small>
        </li>
        <li className="list-group-item">
          <strong>Approval Pending</strong>
          <br />
          <small className="text-muted">2024-08-12 09:00 AM</small>
        </li>
      </ul>
    </div>
  </div>
</div>

          </div>
          <div className="custom-footer d-flex justify-content-center align-items-center mt-4 gap-8">
      <Button
        variant="inter fw-bold me-2 p-3 w-40"
        style={{ backgroundColor: "#707070", color: "#fff" }}
        onClick={handleNavigate}
      >
        Back To Dashboard
      </Button>
    </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderHistory;

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Neiuprocure.css';
import PurchaseRequestDetails from './modals/PurchasRequestDetails';


function Neiuprocure() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="container-fluid min-vh-100">
      <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUPROCURE</h3>
        <div className="container-fluid">
          {/* Card Section */}
          <div className="container-fluid">
            <div className="row">
              {/* Status Cards */}
              <div className="col"><div className="flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">All <br /><strong>50</strong></div></div>
              <div className="col"><div className="flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">Rejected <br /><strong>7</strong></div></div>
              <div className="col"><div className="flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">Approved <br /><strong>23</strong></div></div>
              <div className="col"><div className="flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">Pending <br /><strong>20</strong></div></div>
            </div>
          </div>
          <div className="d-flex justify-content-end  m-3 align-items-center mx-5">
              <button
                className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3  gap-4 align-items-lg-center"
               >
                Add & Manage
                <img src="./add.png" alt="add.png"/>
              </button>
              </div>
          

          {/* Table Section */}
          <div className="custom-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Request Type</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Requester</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Crew Expense</td>
                <td className="text-danger fw-bold">Pending</td>
                <td>2024-08-18</td>
                <td>Jane Doe</td>
                <td><button className="btn btn-link" onClick={() => setShowDetails(true)}>View Details</button></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Crew Expense</td>
                <td className="text-success fw-bold">Approved</td>
                <td>2024-08-18</td>
                <td>Jane Doe</td>
                <td><button className="btn btn-link" onClick={() => setShowDetails(true)}>View Details</button></td>
              </tr>
              {/* Add other rows as needed */}
            </tbody>
          </table>
          </div>
          {/* Modal for Purchase Request Details */}
          <PurchaseRequestDetails show={showDetails} onHide={() => setShowDetails(false)} />
        </div>
      </div>
    </>
  );
}

export default Neiuprocure;

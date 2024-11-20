import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface CategoryData {
  no: number;
  requestType: string;
  status: string;
  date: string;
  requester: string;
  actions: string;
}

function Neiuprocure() {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [rejectedRequests, setRejectedRequests] = useState<number>(0);
  const [approvedRequests, setApprovedRequests] = useState<number>(0);
  const [pendingRequests, setPendingRequests] = useState<number>(0);

  const [selectedRowData, setSelectedRowData] = useState<CategoryData | null>(null);

  const columnDefs: ColDef[] = [
    { field: "no", flex: 1, headerName: "No.", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "requestType", flex: 1, headerName: "Request Type", filter: "agTextColumnFilter", floatingFilter: true },
    {
      field: "status",
      flex: 1,
      headerName: "Status",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      cellStyle: (params) => ({
        color: params.value === "Approved" ? "green" : params.value === "Pending" ? "red" : "black",
        textDecoration: "underline",
      }),
    },
    { field: "date", flex: 1, headerName: "Date", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "requester", flex: 1, headerName: "Requester", filter: "agTextColumnFilter", floatingFilter: true },
    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams) => (
        <button
          className="btn btn-link"
          onClick={() => handleViewDetails(params.data)}
        >
          View
        </button>
      ),
    },
  ];

  // Fetch table data
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("YOUR_API_ENDPOINT_FOR_TABLE_DATA");
        setRowData(response.data);
      } catch (err) {
        setError("Failed to fetch table data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTableData();
  }, []);

  // Fetch card data
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT_FOR_CARD_DATA");
        const { total, rejected, approved, pending } = response.data;

        setTotalRequests(total);
        setRejectedRequests(rejected);
        setApprovedRequests(approved);
        setPendingRequests(pending);
      } catch (err) {
        setError("Failed to fetch card data");
        console.error(err);
      }
    };
    fetchCardData();
  }, []);

  const handleViewDetails = (data: CategoryData) => {
    setSelectedRowData(data);
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
        <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUPROCURE</h3>
        <div className="container-fluid">
          {/* Card Section */}
          <div className="row">
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                All <br />
                <strong>{totalRequests}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Rejected <br />
                <strong>{rejectedRequests}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Approved <br />
                <strong>{approvedRequests}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Pending <br />
                <strong>{pendingRequests}</strong>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end m-3 align-items-center">
            <button
              className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3 gap-4 align-items-lg-center"
              
            >
              Add & Manage
              <img src="./add.png" alt="add.png" />
            </button>
          </div>

          <div className="ag-theme-quartz mt-3" style={{ height: "600px", width: "100%" }}>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <AgGridReact
                rowData={rowData.length ? rowData : null}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                onGridReady={(params) => params.api.sizeColumnsToFit()}
              />
            )}
          </div>

          {selectedRowData && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h5>Request Details</h5>
              <p><strong>No:</strong> {selectedRowData.no}</p>
              <p><strong>Request Type:</strong> {selectedRowData.requestType}</p>
              <p><strong>Status:</strong> {selectedRowData.status}</p>
              <p><strong>Date:</strong> {selectedRowData.date}</p>
              <p><strong>Requester:</strong> {selectedRowData.requester}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Neiuprocure;

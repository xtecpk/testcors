import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ForwardModal from "./model/ForwardModal";

interface CategoryData {
  no: number;
  taskTitle: string;
  description: string;
  department: string;
  location: string;
  assigned: string;
  status: string;
  equipment: string;
  tools: string;
}

function ForwardPlanning() {
  // State for holding row data and loading/error states
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<CategoryData[]>("your_api");
        setRowData(response.data); // Update row data with API response
      } catch (error) {
        setError("Error fetching data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Column definitions for ag-grid
  const columnDefs: ColDef[] = [
    { field: "no", flex: 1, headerName: "No.", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "taskTitle", flex: 1, headerName: "Task Title", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "description", flex: 1, headerName: "Description", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "department", flex: 1, headerName: "Dept.", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "location", flex: 1, headerName: "Location", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "assigned", flex: 1, headerName: "Assigned", filter: "agTextColumnFilter", floatingFilter: true },
    {
      field: "status",
      flex: 1,
      headerName: "Status",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      cellStyle: (params) => ({
        color: params.value === "Approved" ? "green" : params.value === "Pending" ? "red" : "black",
        textDecoration: "underline"
      }),
    },
    { field: "equipment", flex: 1, headerName: "Equipment", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "tools", flex: 1, headerName: "Tools", filter: "agTextColumnFilter", floatingFilter: true },
  ];

  const handleModalClose = (e: React.MouseEvent) => {
    // If the click is outside the modal, close it
    if (e.target === e.currentTarget) {
      setShowDetails(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end  m-3 align-items-center mx-4">
        <button
          className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3  gap-4 align-items-lg-center"
          onClick={() => setShowDetails(true)}
        >
          Add Forward Planning
          <img src="./add.png" alt="add.png"/>
        </button>
      </div>
      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Loading Spinner */}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <div className="ag-theme-quartz mt-3" style={{ height: "500px", width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
            onGridReady={(params) => params.api.sizeColumnsToFit()}
          />
        </div>
      )}
      
      {/* Modal */}
      <ForwardModal show={showDetails} onHide={handleModalClose} />
    </>
  );
}

export default ForwardPlanning;

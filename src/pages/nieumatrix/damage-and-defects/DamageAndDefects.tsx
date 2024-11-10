import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Common from "../modal/Common";

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

function DamageAndDefects() {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const columnDefs: ColDef[] = [
    { field: "no", flex: 1, headerName: "No.", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "taskTitle", flex: 1, headerName: "Task Title", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "description", flex: 1, headerName: "Description", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "department", flex: 1, headerName: "Dept.", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "location", flex: 1, headerName: "Location", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "assigned", flex: 1, headerName: "Assigned", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "status", flex: 1, headerName: "Status", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "equipment", flex: 1, headerName: "Equipment", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "tools", flex: 1, headerName: "Tools", filter: "agTextColumnFilter", floatingFilter: true },
  ];

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

  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-end ">
        <button className="btn blue text-white w-40 inter text-lg p-3 mr-6" onClick={()=>setShowDetails(true)}
          >
          Add Tasks
        </button>
      </div>
      {/* Table */}
      <div className="ag-theme-quartz mt-3" style={{ height: "500px", width: "100%" }}>
        {loading ? (
          <div>Loading....</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
            onGridReady={(params) => params.api.sizeColumnsToFit()}
          />
        )}
      </div>
      <Common show={showDetails} onHide={()=>setShowDetails(false)} />
    </>
  );
}

export default DamageAndDefects;

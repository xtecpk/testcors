import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import BoxInventoryModal from "./modal/BoxInventoryModal";

// Define the structure of data expected from the API
interface CategoryData {
  id: number;
  name: string;
  label: string;
  type: string;
}

const BoxInventoryLabel = () => {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const columnDefs: ColDef<CategoryData>[] = [
    { field: "id", flex: 1, headerName: "ID", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "name", flex: 1, headerName: "Name", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "label", flex: 1, headerName: "Label", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "type", flex: 1, headerName: "Type", filter: "agTextColumnFilter", floatingFilter: true },
  ];
  const [showDetails, setShowDetails] = useState<boolean>(false);

  

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<CategoryData[]>("your_api_endpoint_here");
        setRowData(response.data); // Update rowData with API response
      } catch (error) {
        setError("Error fetching data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    
      {/* Table for Labels */}
      <div className="d-flex justify-content-end  m-3 align-items-center">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-36 text-lg font-semibold inter p-3  gap-4 align-items-lg-center"
        onClick={() => setShowDetails(true)}>
          Add
          <img src="./add.png" alt="add.png" />
        </button>
      </div>
      <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
        {loading ? (
          <div>Loading...</div>
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
      <BoxInventoryModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
};

export default BoxInventoryLabel;

import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Define the structure of data expected from the API
interface CategoryData {
  id: number;
  name: string;
  label: string;
  type: string;
}

const BottLevel = () => {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const columnDefs: ColDef<CategoryData>[] = [
    { field: "id", flex: 1, headerName: "ID", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "name", flex: 1, headerName: "Name", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "label", flex: 1, headerName: "Label", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "type", flex: 1, headerName: "Type", filter: "agTextColumnFilter", floatingFilter: true },
  ];

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
      <div className="ag-theme-quartz rounded-sm" style={{ height: "500px", width: "100%" }}>
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
    </>
  );
};

export default BottLevel;

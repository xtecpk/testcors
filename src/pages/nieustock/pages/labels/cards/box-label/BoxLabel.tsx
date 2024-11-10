import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Define the type structure for CategoryData
interface CategoryData {
  id: number;
  name: string;
  label: string;
  type: string;
}

const BoxLabel = () => {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [columnDefs] = useState<ColDef<CategoryData>[]>([
    { field: "id", flex: 1, headerName: "ID", filter: true, floatingFilter: true },
    { field: "name", flex: 1, headerName: "Name", filter: true, floatingFilter: true },
    { field: "label", flex: 1, headerName: "Label", filter: true, floatingFilter: true },
    { field: "type", flex: 1, headerName: "Type", filter: true, floatingFilter: true },
  ]);

  useEffect(() => {
    // Fetch data from the API
    axios.get("your_api_endpoint_here")
      .then((response) => {
        setRowData(response.data); // Update rowData with API response
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Cards for Labels */}
      <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
        {loading ? (
          <div>Loading...</div>
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

export default BoxLabel;

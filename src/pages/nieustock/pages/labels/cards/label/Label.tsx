import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Define the interface for category data
interface CategoryData {
  id: number;
  name: string;
  label: string;
  type: string;
}

const Label = () => {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [columnDefs] = useState<ColDef<CategoryData>[]>([
    { field: "id", flex: 1, headerName: "ID", filter: true, floatingFilter: true },
    { field: "name", flex: 1, headerName: "Name", filter: true, floatingFilter: true },
    { field: "label", flex: 1, headerName: "Label", filter: true, floatingFilter: true },
    { field: "type", flex: 1, headerName: "Type", filter: true, floatingFilter: true },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/categories"); // Adjust the URL to your API endpoint
        setRowData(response.data); // Assuming the response contains the data you need
        setLoading(false);
      } catch (err) {
        console.error("API Fetch Error:", err); // Log the error for debugging
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Caeds for Labels */}
      <div className="container-fluid">
      <div className="row">
        <div className="col-12">
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
      </div>
      </div>
      </div>
    </>
  );
}

export default Label;

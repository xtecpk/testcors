import { useState, useEffect } from "react";
import axiosInstance from "./../../../../../../axiosInstance";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import LabelModal from "./modal/LabelModal";

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

  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/categories"); // Use the Axios instance to make the request
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
      <div className="d-flex justify-content-end  m-3 align-items-center">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-36 text-lg font-semibold inter p-3  gap-4 align-items-lg-center"
        onClick={() => setShowDetails(true)}>
          Add
          <img src="./add.png" alt="add.png" />
        </button>
      </div>
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
      <LabelModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
}

export default Label;

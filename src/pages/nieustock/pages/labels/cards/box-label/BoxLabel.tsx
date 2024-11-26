import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import BoxLabelModal from "./modal/BoxLabelModal";

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
  const [showDetails, setShowDetails] = useState<boolean>(false);


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
      <BoxLabelModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
};

export default BoxLabel;

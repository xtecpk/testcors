import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import LockerIndiviualModal from "./modal/LockerIndiviualModal";

interface CategoryData {
  id: number;
  name: string;
  label: string;
  type: string;
}

const LockerIndividualLevel = () => {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columnDefs: ColDef[] = [
    { field: "id", flex: 1, headerName: "ID", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "name", flex: 1, headerName: "Name", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "label", flex: 1, headerName: "Label", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "type", flex: 1, headerName: "Type", filter: "agTextColumnFilter", floatingFilter: true },
  ];
  const [showDetails, setShowDetails] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT"); // Replace with your API endpoint
        setRowData(response.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch data");
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
      <LockerIndiviualModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
};

export default LockerIndividualLevel;

import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, CellEditingStoppedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axiosInstance from "../../axiosInstance"; // Import your axios instance
import NieusetModal from "./modal/NieusetModal";

interface CategoryData {
  no: number;
  userName: string;
  role: string;
  lastActive: string;
  email: string;
  status: string;
  lastLoginIp: string;
}

function NieuSet() {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [inactiveUsers, setInactiveUsers] = useState<number>(0);
  const [superAdminCount, setSuperAdminCount] = useState<number>(0);

  const columnDefs: ColDef[] = [
    { field: "no", flex: 1, headerName: "No.", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "vesselId", flex: 1, headerName: "Vessel ID", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "registoryNo", flex: 1, headerName: "Registory No", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "length", flex: 1, headerName: "Length(ft)", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "width", flex: 1, headerName: "Width(ft)", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "homePort", flex: 1, headerName: "Home Port", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "yearBuilt", flex: 1, headerName: "Year Built", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("YOUR_API_ENDPOINT_FOR_TABLE_DATA");
        setRowData(response.data);
      } catch (error) {
        console.error("Failed to fetch table data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axiosInstance.get("YOUR_API_ENDPOINT_FOR_CARD_DATA");
        const { total, active, inactive, superAdmin } = response.data;

        setTotalUsers(total);
        setActiveUsers(active);
        setInactiveUsers(inactive);
        setSuperAdminCount(superAdmin);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    };
    fetchCardData();
  }, []);

  const handleCellEdit = async (params: CellEditingStoppedEvent) => {
    const updatedData = params.data as CategoryData;
    try {
      await axiosInstance.put(`YOUR_API_ENDPOINT_FOR_UPDATE/${updatedData.no}`, updatedData);
      console.log("Data updated successfully:", updatedData);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
        <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUSET</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Vessel Name <br />
                <strong className="mt-1">{totalUsers}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Modal <br />
                <strong className="mt-1">{activeUsers}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Make <br />
                <strong className="mt-1">{inactiveUsers}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                In Service Since <br />
                <strong className="mt-1">{superAdminCount}</strong>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end m-3 align-items-center">
            <button
              className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3 gap-4 align-items-lg-center"
              onClick={() => setShowDetails(true)}
            >
              Add NIEUSET
              <img src="./add.png" alt="add.png" />
            </button>
          </div>
          <div className="ag-theme-quartz mt-3" style={{ height: "600px", width: "100%" }}>
            {loading ? (
              <div>Loading....</div>
            ) : (
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={5}
                onCellEditingStopped={handleCellEdit}
                onGridReady={(params) => params.api.sizeColumnsToFit()}
              />
            )}
          </div>
        </div>
      </div>
      <NieusetModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
}

export default NieuSet;

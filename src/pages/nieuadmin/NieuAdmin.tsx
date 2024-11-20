import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, CellEditingStoppedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AdminModal from "./modal/AdminModal";
import axiosInstance from "../../axiosInstance"; // Import your axios instance

interface CategoryData {
  no: number;
  userName: string;
  role: string;
  lastActive: string;
  email: string;
  status: string;
  lastLoginIp: string;
}

function NieuAdmin() {
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [inactiveUsers, setInactiveUsers] = useState<number>(0);
  const [superAdminCount, setSuperAdminCount] = useState<number>(0);

  const columnDefs: ColDef[] = [
    { field: "no", flex: 1, headerName: "No.", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "userName", flex: 1, headerName: "User Name", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "role", flex: 1, headerName: "Role", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "lastActive", flex: 1, headerName: "Last Active", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "email", flex: 1, headerName: "Email", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "status", flex: 1, headerName: "Status", editable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { field: "lastLoginIp", flex: 1, headerName: "Last Login IP", editable: false, filter: "agTextColumnFilter", floatingFilter: true },
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
        <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUADMIN</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Total <br />
                <strong className="mt-1">{totalUsers}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Active <br />
                <strong className="mt-1">{activeUsers}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Inactive <br />
                <strong className="mt-1">{inactiveUsers}</strong>
              </div>
            </div>
            <div className="col">
              <div className="flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Super Admin <br />
                <strong className="mt-1">{superAdminCount}</strong>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end m-3 align-items-center">
            <button
              className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3 gap-4 align-items-lg-center"
              onClick={() => setShowDetails(true)}
            >
              Add Admin
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
      <AdminModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
}

export default NieuAdmin;

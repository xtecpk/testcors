import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import  axiosInstance  from "../../../axiosInstance"; // Adjust the import path based on your Axios instance location
import MaintanceStaffModal from "./modal/MaintanceStaffModal";

interface MaintanceStaff {
  name: string;
  rank: string;
  department: string;
  status: string;
  nextCertifationExpiry: string;
  leaveDays: number;
}

function MaintanceStaff() {



  const [totalMaintenanceStaff, setTotalMaintenanceStaff] = useState<number>(0);
  const [activeMaintenanceStaff, setActiveMaintenanceStaff] = useState<number>(0);
  const [onLeave, setOnLeave] = useState<number>(0);
  const [newMaintenanceStaff, setNewMaintenanceStaff] = useState<number>(0);
  const [rowData, setRowData] = useState<MaintanceStaff[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleModalClose = (e: React.MouseEvent) => {
    // If the click is outside the modal, close it
    if (e.target === e.currentTarget) {
      setShowDetails(false);
    }
  };

  const [columnDefs] = useState<ColDef<MaintanceStaff>[]>([
    {
      field: "name",
      flex: 1,
      headerName: "Name",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "rank",
      flex: 1,
      headerName: "Rank",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "department",
      flex: 1,
      headerName: "Department",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "status",
      flex: 1,
      headerName: "Status",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "nextCertifationExpiry",
      flex: 1,
      headerName: "Next Certifation Expiry",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "leaveDays",
      flex: 1,
      headerName: "Leave Days",
      filter: true,
      floatingFilter: true,
    },
  ]);

  // Fetch summary data (card counting)
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const { data } = await axiosInstance.get("crew/staff/summary"); // Replace with your API endpoint
        setTotalMaintenanceStaff(data.totalMaintenanceStaff);
        setActiveMaintenanceStaff(data.activeMaintenanceStaff);
        setOnLeave(data.onLeave);
        setNewMaintenanceStaff(data.newMaintenanceStaff);
      } catch (error) {
        console.error("Error fetching crew summary data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  // Fetch crew members data for the table
  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const { data } = await axiosInstance.get("crew/staff"); // Replace with your API endpoint
        setRowData(data); // Assuming the API returns the crew staff data
      } catch (error) {
        console.error("Error fetching crew data:", error);
      }
    };

    fetchCrewData();
  }, []);


  return (
    <>
      {/* Summary Cards */}
      <div className="container-fluid ">
        <div className="row gap-12 px-5 ">
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
          Total Maintenance Staff <br />
            <strong className="mt-1">{totalMaintenanceStaff}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
          Active Maintenance Staff <br />
            <strong className="mt-1">{activeMaintenanceStaff}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
            On Leave <br />
            <strong className="mt-1">{onLeave}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
          New Maintenance Staff <br />
            <strong className="mt-1">{newMaintenanceStaff}</strong>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end  m-3 align-items-center ">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-68 text-lg font-semibold inter p-3  gap-4 align-items-lg-center"
        onClick={() => setShowDetails(true)}>
          Add Maintenance Staff
          <img src="./add.png" alt="add.png" />
        </button>
      </div>

      {/* Product Table */}
      <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
        <AgGridReact<MaintanceStaff>
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
      <MaintanceStaffModal show={showDetails} onHide={handleModalClose} />

    </>
  )
}

export default MaintanceStaff
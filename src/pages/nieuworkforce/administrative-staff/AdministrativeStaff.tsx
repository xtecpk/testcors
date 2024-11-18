import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import  axiosInstance  from "../../../axiosInstance"; // Adjust the import path based on your Axios instance location

interface AdministrativeStaff {
  name: string;
  rank: string;
  department: string;
  status: string;
  nextCertifationExpiry: string;
  leaveDays: number;
}

function AdministrativeStaff() {

  const [totalAdministrativeStaff, setTotalAdministrativeStaff] = useState<number>(0);
  const [activeAdministrativeStaff, setActiveAdministrativeStaff] = useState<number>(0);
  const [onLeave, setOnLeave] = useState<number>(0);
  const [newAdministrativeStaff, setNewAdministrativeStaff] = useState<number>(0);
  const [rowData, setRowData] = useState<AdministrativeStaff[]>([]);

  const [columnDefs] = useState<ColDef<AdministrativeStaff>[]>([
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
        setTotalAdministrativeStaff(data.totalAdministrativeStaff);
        setActiveAdministrativeStaff(data.activeAdministrativeStaff);
        setOnLeave(data.onLeave);
        setNewAdministrativeStaff(data.newAdministrativeStaff);
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
          Total Administrative Staff <br />
            <strong className="mt-1">{totalAdministrativeStaff}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
          Active Administrative Staff <br />
            <strong className="mt-1">{activeAdministrativeStaff}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
            On Leave <br />
            <strong className="mt-1">{onLeave}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
          New Administrative Staff <br />
            <strong className="mt-1">{newAdministrativeStaff}</strong>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end  m-3 align-items-center ">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-56 text-lg font-semibold inter p-3  gap-4 align-items-lg-center">
          Add Administrative Staff
          <img src="./add.png" alt="add.png" />
        </button>
      </div>

      {/* Product Table */}
      <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
        <AgGridReact<AdministrativeStaff>
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </>
  )
}

export default AdministrativeStaff
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community"; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import PlanedModel from "./modal/PlanedModel";

interface DepartmentData {
  department: string;
  subDepartment: string;
  rank: string;
  rankLevel: string;
  rankAccessLevel: string;
}

const dummyData: DepartmentData[] = [
  { department: "Deck", subDepartment: "", rank: "Chief Officer", rankLevel: "HOD", rankAccessLevel: "Full in Department" },
  { department: "Deck", subDepartment: "Deckhand", rank: "Bosun", rankLevel: "Assistant HOD", rankAccessLevel: "Partial in Sub-Department" },
  { department: "Deck", subDepartment: "OOW", rank: "2nd Officer", rankLevel: "Assistant HOD", rankAccessLevel: "Partial in Sub-Department" },
  { department: "Deck", subDepartment: "OOW", rank: "3rd Officer", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
  { department: "Deck", subDepartment: "Deckhand", rank: "Carpenter", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
  { department: "Deck", subDepartment: "Deckhand", rank: "Deckhand", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
  { department: "Interior", subDepartment: "", rank: "Chief Stew", rankLevel: "HOD", rankAccessLevel: "Full in Sub-Department" },
  { department: "Interior", subDepartment: "", rank: "Head Chef", rankLevel: "HOD", rankAccessLevel: "Full in Sub-Department" },
  { department: "Interior", subDepartment: "Housekeeping", rank: "Headhouse Keeper", rankLevel: "Assistant HOD", rankAccessLevel: "Partial in Sub-Department" },
  { department: "Interior", subDepartment: "Service", rank: "Head Service Stew", rankLevel: "Assistant HOD", rankAccessLevel: "Partial in Sub-Department" },
  { department: "Interior", subDepartment: "Service", rank: "Stew", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
  { department: "Engineering", subDepartment: "", rank: "Chief Engineer", rankLevel: "HOD", rankAccessLevel: "Full in Department" },
  { department: "Engineering", subDepartment: "", rank: "2nd Engineer", rankLevel: "Assistant HOD", rankAccessLevel: "Partial in Department" },
  { department: "Engineering", subDepartment: "AVIT", rank: "AVIT 1", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
  { department: "Engineering", subDepartment: "ETO", rank: "ETO", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
  { department: "Engineering", subDepartment: "Engineer", rank: "4th Engineer", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
  { department: "Engineering", subDepartment: "Engineer", rank: "Motorman", rankLevel: "Crew", rankAccessLevel: "Limited Sub Department" },
];

function PlanedMaintenance() {
  const [rowData, setRowData] = useState<DepartmentData[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setRowData(dummyData);
  }, []);

  const columnDefs: Array<ColDef<DepartmentData>> = [
    { field: "department", flex: 1, headerName: "Department", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "subDepartment", flex: 1, headerName: "Sub Department", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "rank", flex: 1, headerName: "Rank", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "rankLevel", flex: 1, headerName: "Rank Level", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "rankAccessLevel", flex: 1, headerName: "Rank Access Level", filter: "agTextColumnFilter", floatingFilter: true },
  ];

  return (
    <>
      <div className="d-flex justify-content-end m-3 align-items-center mx-4">
        <button
          className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3 gap-4 align-items-lg-center"
          onClick={() => setShowDetails(true)}
        >
          Add Planned Maintenance
          <img src="./add.png" alt="Add" />
        </button>
      </div>
      
      <div className="ag-theme-quartz mt-3" style={{ height: "500px", width: "100%" }}>
        <AgGridReact<DepartmentData>
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>

      <PlanedModel show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
}

export default PlanedMaintenance;

import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Define the CategoryData type
interface CategoryData {
  id: number;
  name: string;
  ref: string;
  date: string;
  createdBy: string;
  approved: boolean;
  submitted: boolean;
  paid: boolean;
  status: string;
}

function PurchaseRequest() {
  const [summaryData, setSummaryData] = useState({
    totalCategories: 0,
    topCategoriesStock: 0,
    lowStockCategories: 0,
    recentlyUpdatedCategories: 0
  });

  const [rowData, setRowData] = useState<CategoryData[]>([]);

  const [columnDefs] = useState<ColDef<CategoryData>[]>([
    { field: "id", flex: 1, headerName: "ID", filter: true, floatingFilter: true },
    { field: "name", flex: 1, headerName: "Name", filter: true, floatingFilter: true },
    { field: "ref", flex: 1, headerName: "Ref", filter: true, floatingFilter: true },
    { field: "date", flex: 1, headerName: "Date", filter: true, floatingFilter: true },
    { field: "createdBy", flex: 1, headerName: "Created By", filter: true, floatingFilter: true },
    { field: "approved", flex: 1, headerName: "Approved", filter: true, floatingFilter: true },
    { field: "submitted", flex: 1, headerName: "Submitted", filter: true, floatingFilter: true },
    { field: "paid", flex: 1, headerName: "Paid", filter: true, floatingFilter: true },
    { field: "status", flex: 1, headerName: "Status", filter: true, floatingFilter: true },
  ]);

  const fetchSummaryData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/summary");
      setSummaryData(response.data);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/purchase-requests");
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchSummaryData();
    fetchTableData();
  }, []);

  return (
    <>

        <div className="container-fluid">
          <div className="row gap-8 px-5">
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Total Requests <br />
                <strong className="mt-1">{summaryData.totalCategories}</strong>
              </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Pending Requests <br />
                <strong className="mt-1">{summaryData.topCategoriesStock}%</strong>
              </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Approved Requests <br />
                <strong className="mt-1">{summaryData.lowStockCategories}</strong>
              </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Requests Over Time <br />
                <strong className="mt-1">{summaryData.recentlyUpdatedCategories}</strong>
              </div>
          </div>
        </div>
        <div className="d-flex justify-content-end  m-3 align-items-center">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-54 text-lg font-semibold inter p-3  gap-4 align-items-lg-center">
          Add Purchase
          <img src="./add.png" alt="add.png" />
        </button>
      </div>

        <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            onGridReady={(params) => params.api.sizeColumnsToFit()}
          />
        </div>
    </>
  );
}

export default PurchaseRequest;

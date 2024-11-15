import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import StoreModal from "./modal/StoreModal";

// Define TypeScript interface for the table data
interface CategoryData {
  name: string;
  products: number;
  deck: string;
  section: string;
  alerts: string;
  capacityM3: number;
  purchaseRequest: string;
}

// Define TypeScript interface for summary data
interface SummaryData {
  totalCategories: number;
  topCategoriesStock: number;
  lowStockCategories: number;
  recentlyUpdatedCategories: number;
}

function Stores() {


  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<SummaryData>({
    totalCategories: 0,
    topCategoriesStock: 0,
    lowStockCategories: 0,
    recentlyUpdatedCategories: 0,
  });
  
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  
  const [columnDefs] = useState<ColDef<CategoryData>[]>([
    { field: "name", flex: 1, headerName: "Name", filter: true, floatingFilter: true },
    { field: "products", flex: 1, headerName: "Products", filter: true, floatingFilter: true },
    { field: "deck", flex: 1, headerName: "Deck", filter: true, floatingFilter: true },
    { field: "section", flex: 1, headerName: "Section", filter: true, floatingFilter: true },
    { field: "alerts", flex: 1, headerName: "Alerts", filter: true, floatingFilter: true },
    { field: "capacityM3", flex: 1, headerName: "Capacity m³", filter: true, floatingFilter: true },
    { field: "purchaseRequest", flex: 1, headerName: "Purchase Request", filter: true, floatingFilter: true },
  ]);

  // Fetch data for summary cards
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get("API_URL_FOR_SUMMARY_DATA"); // Replace with actual URL
        setSummaryData(response.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  // Fetch data for the table
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("API_URL_FOR_TABLE_DATA"); // Replace with actual URL
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, []);

  return (
    <>

        {/* Summary Cards */}
        <div className="container-fluid text-center my-4">
          <div className="row gap-8 px-5">
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Total Stores <br />
                <strong className="mt-1">{summaryData.totalCategories}10</strong>
            </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Inventory Levels <br />
                <strong className="mt-1">{summaryData.topCategoriesStock}12%</strong>
            </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Stores Low on Stock <br />
                <strong className="mt-1">{summaryData.lowStockCategories}15</strong>
            </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Recently Restocked Stores <br />
                <strong className="mt-1">{summaryData.recentlyUpdatedCategories}256</strong>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end  m-3 align-items-center">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-54 text-lg font-semibold inter p-3  gap-4 align-items-lg-center" onClick={() => setShowDetails(true)}>
          Add Stores
          <img src="./add.png" alt="add.png" />
        </button>
      </div>

        {/* Stores Table */}
        <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            onGridReady={(params) => params.api.sizeColumnsToFit()}
          />
        </div>
        <StoreModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
}

export default Stores;

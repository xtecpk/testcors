import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CategorieModal from "./modal/CategorieModal";

// Define a TypeScript interface for the row data
interface CategoryData {
  name: string;
  description: string;
  store: string;
  productsCount: number;
}

function Categories() {

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState({
    totalCategories: 0,
    topCategoriesStock: 0,
    lowStockCategories: 0,
    recentlyUpdatedCategories: 0,
  });
  
  const [rowData, setRowData] = useState<CategoryData[]>([]);
  const [columnDefs] = useState<ColDef<CategoryData>[]>([
    { field: "name", flex: 1, headerName: "Name", filter: true, floatingFilter: true },
    { field: "description", flex: 1, headerName: "Description", filter: true, floatingFilter: true },
    { field: "store", flex: 1, headerName: "Store", filter: true, floatingFilter: true },
    { field: "productsCount", flex: 1, headerName: "Products Count", filter: true, floatingFilter: true },
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

    const fetchTableData = async () => {
      try {
        const response = await axios.get("API_URL_FOR_TABLE_DATA"); // Replace with actual URL
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchSummaryData();
    fetchTableData();
  }, []);

  return (
    <>
    
      {/* Summary Cards */}
      <div className="container-fluid">
        <div className="row gap-12 px-5">
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
              Total Categories <br />
              <strong className="mt-1">{summaryData.totalCategories} 10</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
              Top Categories By Stock <br />
              <strong className="mt-1">{summaryData.topCategoriesStock} 10</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
              Low Stock Categories <br />
              <strong className="mt-1">{summaryData.lowStockCategories} 10</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
              Recently Updated Categories <br />
              <strong className="mt-1">{summaryData.recentlyUpdatedCategories} 10</strong>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end  m-3 align-items-center">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-56 text-lg font-semibold inter p-3  gap-4 align-items-lg-center" onClick={() => setShowDetails(true)}>
          Add Categories
          <img src="./add.png" alt="add.png" />
        </button>
      </div>

      {/* Categories Table */}
      <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
      <CategorieModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
}

export default Categories;

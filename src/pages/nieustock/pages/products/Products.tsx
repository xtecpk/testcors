import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import axiosInstance from "../../../../axiosInstance"; // Import Axios Instance
import ProductModal from "./modal/ProductModal";

interface Product {
  id: number;
  sku: number;
  price: number;
  name: string;
  description: string;
  featuredimg: string;
  maxstock: number;
  symbol: string;
  hazmat: string;
  hazmattype: string;
  precaution: string;
  useageinstructions: string;
  avgToolHealth: number;
  mfgDate: string | null;
  expiryDate: string | null;
  minimumstock: number | null;
  maximumstock: number | null;
  createdAt: string;
  updatedAt: string;
}

function Products() {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [rowData, setRowData] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [stockLevels, setStockLevels] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState(0);
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState(0);

  const [columnDefs] = useState<ColDef<Product>[]>([
    {
      field: "featuredimg",
      flex: 1,
      headerName: "Image",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "name",
      flex: 1,
      headerName: "Name",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "symbol",
      flex: 1,
      headerName: "Symbol",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "price",
      flex: 1,
      headerName: "Price",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "maxstock",
      flex: 1,
      headerName: "Stock",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "hazmat",
      flex: 1,
      headerName: "Hazmat",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "hazmattype",
      flex: 1,
      headerName: "Hazmat Type",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "precaution",
      flex: 1,
      headerName: "Precaution",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "useageinstructions",
      flex: 1,
      headerName: "Usage Instructions",
      filter: true,
      floatingFilter: true,
    },
  ]);

  useEffect(() => {
    // Fetch summary data using axios instance
    axiosInstance
      .get("/products-summary") // Make API call using Axios instance
      .then((response) => {
        const data = response.data;
        setTotalProducts(data.totalProducts);
        setStockLevels(data.stockLevels);
        setLowStockProducts(data.lowStockProducts);
        setRecentlyAddedProducts(data.recentlyAddedProducts);
      })
      .catch((error) => console.error("Error fetching summary data:", error));
  }, []);

  useEffect(() => {
    // Fetch product list data using axios instance
    axiosInstance
      .get("product/getallproducts") // Make API call using Axios instance
      .then((response) => {
        const data = response.data.allProduct; // Adjust the response as per your API response structure
        setRowData(data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <>
      {/* Summary Cards */}
      <div className="container-fluid">
        <div className="row gap-12 px-5">
          <div
            className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Total Products <br />
            <strong className="mt-1">{totalProducts}</strong>
          </div>
          <div
            className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Stock Levels <br />
            <strong className="mt-1">{stockLevels}%</strong>
          </div>
          <div
            className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Products Low on Stock <br />
            <strong className="mt-1">{lowStockProducts}</strong>
          </div>
          <div
            className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Recently Added Products <br />
            <strong className="mt-1">{recentlyAddedProducts}</strong>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end m-3 align-items-center ">
        <button
          className="btn blue d-flex align-items-center text-white rounded-xl w-52 text-lg font-semibold inter p-3 gap-4 align-items-lg-center"
          onClick={() => setShowDetails(true)}
        >
          Add Products
          <img src="./add.png" alt="add.png" />
        </button>
      </div>

      {/* Product Table */}
      <div
        className="ag-theme-quartz"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact<Product>
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>

      <ProductModal show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
}

export default Products;

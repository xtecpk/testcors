import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

interface Product {
  image: string;
  name: string;
  categories: string;
  store: string;
  sku: string;
  price: number;
  stock: number;
  type: string;
  usageHistory: string;
  toolhealth: string;
  actions: string;
}

function Products() {
  const [rowData, setRowData] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [stockLevels, setStockLevels] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState(0);
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState(0);

  const [columnDefs] = useState<ColDef<Product>[]>([
    {
      field: "image",
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
      field: "categories",
      flex: 1,
      headerName: "Categories",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "store",
      flex: 1,
      headerName: "Store",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "sku",
      flex: 1,
      headerName: "SKU",
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
      field: "stock",
      flex: 1,
      headerName: "Stock",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "type",
      flex: 1,
      headerName: "Type",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "usageHistory",
      flex: 1,
      headerName: "Usage History",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "toolhealth",
      flex: 1,
      headerName: "Tool Health",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      filter: true,
      floatingFilter: true,
    },
  ]);

  useEffect(() => {
    // Fetch summary data
    axios
      .get("https://api.example.com/products-summary")
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
    // Fetch product list data
    axios
      .get("https://api.example.com/products")
      .then((response) => setRowData(response.data.products))
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <>
      {/* Summary Cards */}
      <div className="container-fluid ">
        <div className="row gap-12 px-5 ">
          <div
            className=" col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Total Products <br />
            <strong className="mt-1">{totalProducts}</strong>
          </div>
          <div
            className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Stock Levels <br />
            <strong className="mt-1">{stockLevels}%</strong>
          </div>
          <div
            className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Products Low on Stock <br />
            <strong className="mt-1">{lowStockProducts}</strong>
          </div>
          <div
            className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold"
          >
            Recently Added Products <br />
            <strong className="mt-1">{recentlyAddedProducts}</strong>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end  m-3 align-items-center ">
        <button className="btn blue d-flex align-items-center text-white rounded-xl w-56 text-lg font-semibold inter p-3  gap-4 align-items-lg-center">
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
    </>
  );
}

export default Products;

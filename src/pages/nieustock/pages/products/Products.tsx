import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axiosInstance from "../../../../axiosInstance";
import ProductModal from "./modal/ProductModal";
import ViewModal from "./modal/ViewModal";

interface Product1 {
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
  mfgDate: string;
  expiryDate: string;
  minimumstock: number;
  maximumstock: number;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
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
  mfgDate: string;
  expiryDate: string;
  minimumstock: number;
  maximumstock: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

// Extend the Product type to include additional properties that are not in the actual data
interface ProductWithActions extends Product {
  actions?: string; // Custom field for the actions column
}

function Products() {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [rowData, setRowData] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [stockLevels, setStockLevels] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<number>(0);
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Column definitions for the ag-Grid
  const [columnDefs] = useState<ColDef<ProductWithActions>[]>([
    { field: "sku", flex: 1, headerName: "SKU", filter: true, floatingFilter: true },
    { field: "name", flex: 3, headerName: "Name", filter: true, floatingFilter: true },
    { field: "price", flex: 1, headerName: "Price", filter: true, floatingFilter: true },
    { field: "description", flex: 3, headerName: "Description", filter: true, floatingFilter: true },
    {
      field: "featuredimg",
      flex: 1,
      headerName: "Image",
      cellRenderer: (params: ICellRendererParams<Product1>) => {
        const imageUrl = params.value ? `https://nieucore.com/backend/${params.value}` : null;
        if (!imageUrl) {
          return <span>No Image</span>;
        }
        return <img src={imageUrl} style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "50%" }} crossOrigin="anonymous" />;
      }
    },
    { field: "maxstock", flex: 1, headerName: "Max Stock", filter: true, floatingFilter: true },
    { field: "symbol", flex: 1, headerName: "Symbol", filter: true, floatingFilter: true },
    { field: "hazmat", flex: 2, headerName: "Hazmat", filter: true, floatingFilter: true },
    { field: "hazmattype", flex: 2, headerName: "Hazmat Type", filter: true, floatingFilter: true },
    { field: "precaution", flex: 2, headerName: "Precaution", filter: true, floatingFilter: true },
    { field: "useageinstructions", flex: 2, headerName: "Usage Instructions", filter: true, floatingFilter: true },
    { field: "avgToolHealth", flex: 1, headerName: "Avg Tool Health", filter: true, floatingFilter: true },
    { field: "mfgDate", flex: 1, headerName: "Mfg Date", filter: true, floatingFilter: true },
    { field: "expiryDate", flex: 1, headerName: "Expiry Date", filter: true, floatingFilter: true },
    { field: "minimumstock", flex: 1, headerName: "Minimum Stock", filter: true, floatingFilter: true },
    { field: "maximumstock", flex: 1, headerName: "Maximum Stock", filter: true, floatingFilter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: ICellRendererParams<ProductWithActions>) => {
        return (
          <button
            onClick={() => {
              if (params.data) {
                setSelectedProduct(params.data);
                setShowDetails(true);
              }
            }}
          >
            View
          </button>
        );
      }
    }
  ]);

  // Fetch summary data on component mount
  useEffect(() => {
    axiosInstance.get("/products-summary")
      .then((response) => {
        const { totalProducts, stockLevels, lowStockProducts, recentlyAddedProducts } = response.data;
        setTotalProducts(totalProducts);
        setStockLevels(stockLevels);
        setLowStockProducts(lowStockProducts);
        setRecentlyAddedProducts(recentlyAddedProducts);
      })
      .catch((error) => console.error("Error fetching summary data:", error));
  }, []);

  // Fetch all products on component mount
  useEffect(() => {
    axiosInstance.get("product/getallproducts")
      .then((response) => {
        const data = response.data.allProduct;
        setRowData(data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row gap-12 px-5">
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
            Total Products <br />
            <strong className="mt-1">{totalProducts}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
            Total Stock Levels <br />
            <strong className="mt-1">{stockLevels}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
            Low Stock Products <br />
            <strong className="mt-1">{lowStockProducts}</strong>
          </div>
          <div className="col flex flex-col w-10/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
            Recently Added Products <br />
            <strong className="mt-1">{recentlyAddedProducts}</strong>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end m-3 align-items-center">
        <button
          className="btn blue d-flex align-items-center text-white rounded-xl w-56 text-lg font-semibold inter p-3 gap-4 align-items-lg-center"
          onClick={() => setShowAddProductModal(true)}
        >
          Add Product
        </button>
      </div>

      <div className="ag-theme-quartz" style={{ height: "700px", width: "100%" }}>
        <AgGridReact<ProductWithActions>
          rowData={rowData}
          columnDefs={columnDefs}
          getRowHeight={() => 50}
          pagination={true}
          paginationPageSize={15}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>

      {/* Modals */}
      <ProductModal show={showAddProductModal} onHide={() => setShowAddProductModal(false)} />
      <ViewModal show={showDetails} onHide={() => setShowDetails(false)} product={selectedProduct} />
    </>
  );
}

export default Products;

import { useState, useEffect } from "react";
import Label from "./cards/label/Label";
import BottLevel from "./cards/bott-level/BottLevel";
import BoxInventoryLabel from "./cards/box-inventory-label/BoxInventoryLabel";
import BoxLabel from "./cards/box-label/BoxLabel";
import LockerIndiviualLevel from "./cards/locker-indiviual-level/LockerIndiviualLevel";
import LockerProductList from "./cards/locker-product-list/LockerProductList";
import axiosInstance from "../../../../axiosInstance";


// Define the type for summary data
interface SummaryData {
  totalLabels: number;
  mostUsedLabels: number;
  recentlyAddedLabels: number;
  labelsByCategory: number;
}

function LabCards() {


  const [activeCard, setActiveCard] = useState<string>("Label");
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null); // The type is either SummaryData or null initially
  const [loading, setLoading] = useState<boolean>(true);

  // Function to handle card click
  const handleCardClick = (cardName: string) => {
    setActiveCard(cardName);
  };

  // Fetch summary data from the API
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axiosInstance.get("/api/summary"); // Use the Axios instance to make the request
        setSummaryData(response.data); // Axios automatically parses the JSON, so no need for response.json()
        setLoading(false);
      } catch (error: unknown) {
        // Simply log the error, no need to set state for it.
        if (error instanceof Error) {
          console.error("Error fetching summary data:", error.message);
        } else {
          console.error("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <>

        {/* Summary Cards Section */}
        <div className="container-fluid ">
          <div className="row gap-8 px-5 ">
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Total Labels <br />
                <strong>{loading ? "Loading..." : summaryData?.totalLabels}10</strong>
              </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Most Used Labels <br />
                <strong>{loading ? "Loading..." : summaryData?.mostUsedLabels}10</strong>
              </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Recently Added Labels <br />
                <strong>{loading ? "Loading..." : summaryData?.recentlyAddedLabels}10</strong>
              </div>
            <div className="col flex flex-col w-10/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold">
                Labels By Category <br />
                <strong>{loading ? "Loading..." : summaryData?.labelsByCategory}10</strong>
              </div>
          </div>
        </div>

        

        {/* Sidebar and Main Content Section */}
        <div className="container-fluid mt-12">
        <div className="d-flex">
          {/* Sidebar for card navigation */}
          <div className="sidebar p-3 " style={{ width: "250px" }}>
            <div className="card-section">
              <div
                className={`col flex flex-col w-54 h-20 mb-2 p-4 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Label" ? "blue text-white" : "bg-light"}`}
                onClick={() => handleCardClick("Label")}
                style={{ cursor: "pointer" }}
              >
                All
              </div>
              <div
                className={`col flex flex-col w-54 h-20 mb-3 p-4 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "BoxLabel" ? "blue text-white" : "bg-light"}`}
                onClick={() => handleCardClick("BoxLabel")}
                style={{ cursor: "pointer" }}
              >
                Box Label
              </div>
              <div
                className={`col flex flex-col w-54 h-20 mb-3 p-4 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "BoxInventoryLabel" ? "blue text-white" : "bg-light"}`}
                onClick={() => handleCardClick("BoxInventoryLabel")}
                style={{ cursor: "pointer" }}
              >
                Box Inventory Label
              </div>
              <div
                className={`col flex flex-col w-54 h-20 mb-3 p-4 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "BottLevel" ? "blue text-white" : "bg-light"}`}
                onClick={() => handleCardClick("BottLevel")}
                style={{ cursor: "pointer" }}
              >
                Bott Level
              </div>
              <div
                className={`col flex flex-col w-54 h-20 mb-3 p-4 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "LockerIndiviualLevel" ? "blue text-white" : "bg-light"}`}
                onClick={() => handleCardClick("LockerIndiviualLevel")}
                style={{ cursor: "pointer" }}
              >
                Locker Individual Level
              </div>
              <div
                className={`col flex flex-col w-54 h-20 mb-3 p-4 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "LockerProductList" ? "blue text-white" : "bg-light"}`}
                onClick={() => handleCardClick("LockerProductList")}
                style={{ cursor: "pointer" }}
              >
                Locker Product List
              </div>
            </div>
          </div>
          

          {/* Main content area to display selected component */}
          <div className="main-content flex-grow-1 p-4 bg-white">
            {activeCard === "Label" && <Label />}
            {activeCard === "BoxLabel" && <BoxLabel />}
            {activeCard === "BoxInventoryLabel" && <BoxInventoryLabel />}
            {activeCard === "BottLevel" && <BottLevel />}
            {activeCard === "LockerIndiviualLevel" && <LockerIndiviualLevel />}
            {activeCard === "LockerProductList" && <LockerProductList />}
          </div>
        </div>
        </div>
    </>
  );
}

export default function App() {
  return <LabCards />;
}

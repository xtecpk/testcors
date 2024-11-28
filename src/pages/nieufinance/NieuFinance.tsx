import { useState } from "react";
import Budget from "./pages/budget/Budget";
import Reports from "./pages/reports/Reports";
import Planning from "./pages/planning/Planning";
import Estimate from "./pages/estimates/Estimate";

function NieuFinance() {
  const [activeCard, setActiveCard] = useState<string>("Budget");

  // Function to handle card click
  const handleCardClick = (cardName: string) => {  // Explicitly typing the parameter
    setActiveCard(cardName); // Update active card
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
      <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUFINANCE</h3>
        <div className="container-fluid text-center mt-4">
          <div className="row  ">
            {/* Card Section */}
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Budget" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm `}
              onClick={() => handleCardClick("Budget")}
              style={{ cursor: "pointer" }}
            >
              Budget
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Reports" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("Reports")}
              style={{ cursor: "pointer" }}
            >
              Reports
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Planning" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("Planning")}
              style={{ cursor: "pointer" }}
            >
              Planning
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Estimates" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("Estimates")}
              style={{ cursor: "pointer" }}
            >
              Estimates
            </div>
            
          </div>
          

          {/* Display the selected component below the cards */}
          <div className="mt-4">
            {activeCard === "Budget" && <Budget />}
            {activeCard === "Reports" && <Reports />}
            {activeCard === "Planning" && <Planning />}
            {activeCard === "Estimates" && <Estimate />}
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <NieuFinance />
  );
}



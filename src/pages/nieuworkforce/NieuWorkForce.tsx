import { useState } from "react";
import AdministrativeStaff from "./administrative-staff/AdministrativeStaff";
import CrewExpensive from "./crew-expense/CrewExpensive";
import CrewStaff from "./crew-staff/CrewStaff";
import InventoryStaff from "./inventory-staff/InventoryStaff";
import MaintanceStaff from "./maintance-staff/MaintanceStaff";

function NieuWorkForce() {
  const [activeCard, setActiveCard] = useState<string>("CrewStaff"); // Initial card set to CrewStaff

  // Function to handle card click
  const handleCardClick = (cardName: string) => {
    setActiveCard(cardName); // Update active card
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
        <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUWORKFORCE</h3>
        <div className="container-fluid text-center mt-4">
          <div className="row">
            {/* Card Section */}
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                activeCard === "CrewStaff" ? "blue text-white" : "bg-light"
              } text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("CrewStaff")}
            >
              Crew Staff
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                activeCard === "InventoryStaff" ? "blue text-white" : "bg-light"
              } text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("InventoryStaff")}
            >
              Inventory Staff
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                activeCard === "MaintanceStaff" ? "blue text-white" : "bg-light"
              } text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("MaintanceStaff")}
            >
              Maintance Staff
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                activeCard === "AdministrativeStaff" ? "blue text-white" : "bg-light"
              } text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("AdministrativeStaff")}
            >
              Administrative Staff
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                activeCard === "CrewExpensive" ? "blue text-white" : "bg-light"
              } text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("CrewExpensive")}
            >
              Crew Expensive
            </div>
          </div>

          {/* Display the selected component below the cards */}
          <div className="mt-4">
            {activeCard === "CrewStaff" && <CrewStaff />}
            {activeCard === "InventoryStaff" && <InventoryStaff />}
            {activeCard === "MaintanceStaff" && <MaintanceStaff />}
            {activeCard === "AdministrativeStaff" && <AdministrativeStaff />}
            {activeCard === "CrewExpensive" && <CrewExpensive />}
          </div>
        </div>
      </div>
    </>
  );
}

export default NieuWorkForce;

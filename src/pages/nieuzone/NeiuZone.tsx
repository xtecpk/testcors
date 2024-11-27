import { useState } from "react";
import Decks from "./pages/decks/Decks";
import Sections from "./pages/sections/Sections";
import Stores from "./pages/stores/Stores";
import Zones from "./pages/zones/Zones";

function NieuZone() {
  const [activeCard, setActiveCard] = useState<string>("Decks");

  // Function to handle card click
  const handleCardClick = (cardName: string) => {  // Explicitly typing the parameter
    setActiveCard(cardName); // Update active card
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
      <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUZONE</h3>
        <div className="container-fluid text-center mt-4">
          <div className="row  ">
            {/* Card Section */}
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Decks" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm `}
              onClick={() => handleCardClick("Decks")}
              style={{ cursor: "pointer" }}
            >
              Decks
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Sections" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("Sections")}
              style={{ cursor: "pointer" }}
            >
              Sections
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Stores" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("Stores")}
              style={{ cursor: "pointer" }}
            >
              Stores
            </div>
            <div
              className={`col flex flex-col w-12/12 h-32 m-2 p-6  rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${activeCard === "Zones" ? "blue text-white" : "bg-light"} text-start p-8 rounded shadow-sm`}
              onClick={() => handleCardClick("Zones")}
              style={{ cursor: "pointer" }}
            >
              Zones
            </div>
            
          </div>
          

          {/* Display the selected component below the cards */}
          <div className="mt-4">
            {activeCard === "Decks" && <Decks />}
            {activeCard === "Sections" && <Sections />}
            {activeCard === "Stores" && <Stores />}
            {activeCard === "Zones" && <Zones />}
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <NieuZone />
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import DamageAndDefects from "./damage-and-defects/DamageAndDefects";
import ForwardPlanning from "./forward-planning/ForwardPlanning";
import LsaFfe from "./lsa & ffe​/LsaFfe";
import PlanedMaintenance from "./Planned-maintenance/PlanedMaintenance";

function NieuMatrix() {
  const [activeCard, setActiveCard] = useState<string>("Damage and Defects"); // Set default card
  const [counts, setCounts] = useState({
    damageAndDefects: 0,
    plannedMaintenance: 0,
    forwardPlanning: 0,
    lsaFfe: 0,
  });

  // Fetch counts from an API when the component loads
  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await axios.get("https://api.example.com/nieumatrix-counts");
        const data = response.data;
        
        setCounts({
          damageAndDefects: data.damageAndDefects,
          plannedMaintenance: data.plannedMaintenance,
          forwardPlanning: data.forwardPlanning,
          lsaFfe: data.lsaFfe,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    }

    fetchCounts();
  }, []);

  const handleCardClick = (cardName: string) => {
    setActiveCard(cardName);
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
        <h3 className="mb-4 text-black ubuntu fw-bold text-3xl">NIEUMATRIX</h3>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col"
              onClick={() => handleCardClick("Damage and Defects")}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                  activeCard === "Damage and Defects" ? "blue text-white" : "bg-light"
                }`}
              >
                Damage and Defects <br />
                <strong className="mt-1">{counts.damageAndDefects}</strong>
              </div>
            </div>
            <div
              className="col"
              onClick={() => handleCardClick("Planned Maintenance")}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                  activeCard === "Planned Maintenance" ? "blue text-white" : "bg-light"
                }`}
              >
                Planned Maintenance <br />
                <strong className="mt-1">{counts.plannedMaintenance}</strong>
              </div>
            </div>
            <div
              className="col"
              onClick={() => handleCardClick("Forward Planning")}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                  activeCard === "Forward Planning" ? "blue text-white" : "bg-light"
                }`}
              >
                Forward Planning <br />
                <strong className="mt-1">{counts.forwardPlanning}</strong>
              </div>
            </div>
            <div
              className="col"
              onClick={() => handleCardClick("LSA & FFE")}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`flex flex-col w-12/12 h-32 m-2 p-6 rounded-lg cursor-pointer transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-start inter text-lg font-semibold ${
                  activeCard === "LSA & FFE" ? "blue text-white" : "bg-light"
                }`}
              >
                LSA & FFE <br />
                <strong className="mt-1">{counts.lsaFfe}</strong>
              </div>
            </div>
          </div>

          {/* Display the selected component below the cards */}
          <div className="mt-4">
            {activeCard === "Damage and Defects" && <DamageAndDefects />}
            {activeCard === "Planned Maintenance" && <PlanedMaintenance />}
            {activeCard === "Forward Planning" && <ForwardPlanning />}
            {activeCard === "LSA & FFE" && <LsaFfe />}
          </div>
        </div>
      </div>
    </>
  );
}

export default NieuMatrix;

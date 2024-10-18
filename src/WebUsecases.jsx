import React, { useState } from "react";
import WebCircleThree from "./WebCircleThree";
import EcosystemWeb from "./EcosystemWeb";
import StartupsWeb from "./StartupsWeb";
import Usecase from "./Usecase";

const WebUsecases = () => {
  const [currentView, setCurrentView] = useState("usecase"); 
  const [selectedEcosystem, setSelectedEcosystem] = useState(null);

  const handleExploreEcosystem = () => {
    setCurrentView("startups");
  };

  const handleExploreUsecases = () => {
    setCurrentView("ecosystem");
  };

  const handleSelectUsecase = (ecosystem) => {
    setSelectedEcosystem(ecosystem); 
    setCurrentView("ecosystem"); 
  };

  return (
    <div className="flex h-screen relative overflow-hidden select-none">
      <WebCircleThree />

      {currentView === "usecase" && (
        <Usecase onSelectUsecase={handleSelectUsecase} />
      )}

      {currentView === "ecosystem" && (
        <EcosystemWeb
          handleExploreClick={handleExploreEcosystem}
          selectedEcosystem={selectedEcosystem}
        />
      )}

      {currentView === "startups" && (
        <StartupsWeb handleEcosystem={handleExploreUsecases} />
      )}
    </div>
  );
};

export default WebUsecases;

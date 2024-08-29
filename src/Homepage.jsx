import React, { useState } from "react";
import Sectors from "./Sectors";
import SubSectors from "./SubSectors";

const Homepage = () => {
  const [selectedSector, setSelectedSector] = useState(null);

  const handleSectorClick = (sectorName) => {
    setSelectedSector(sectorName); // Set the selected sector when a sector is clicked
  };

  return (
    <div>
      {selectedSector ? (
        <SubSectors selectedSector={selectedSector} />
      ) : (
        <Sectors onSectorClick={handleSectorClick} />
      )}
    </div>
  );
};

export default Homepage;

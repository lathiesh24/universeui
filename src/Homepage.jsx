import React, { useState } from "react";
import Sectors from "./Sectors";
import SubSectors from "./SubSectors";

const Homepage = () => {
  const [showSubSectors, setShowSubSectors] = useState(false);

  const handleSectorClick = () => {
    setShowSubSectors(true); // Switch to SubSectors when the small circle is clicked
  };

  return (
    <div>
      {showSubSectors ? (
        <SubSectors />
      ) : (
          <Sectors onSectorClick={handleSectorClick} />
      )}
    </div>
  );
};

export default Homepage;

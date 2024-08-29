import React from "react";
import CurvedLineUp from "./CurvedLineUp";
import CurvedLineDown from "./CurvedLineDown";
import TechnologyTrends from "./TechnologyTrends"
const SubIndustries = () => {
  return (
    <div className="relative h-screen flex flex-col justify-between bg-gray-100">
      {/* CurvedLineUp at the top */}
      <div className="flex-grow-0">
        <CurvedLineUp />
      </div>

      {/* CurvedLineDown at the bottom */}
      <div className="flex-grow-0">
        <TechnologyTrends/>
      </div>
    </div>
  );
};

export default SubIndustries;

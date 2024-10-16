import React, { useState } from "react";
import WebCircleOne from "./WebCircleOne";
import WebCircleTwo from "./WebCircleTwo";

const WebIndustries = () => {
  const [showCircleTwo, setShowCircleTwo] = useState(false); 
  const handleDotClick = () => {
    setShowCircleTwo(true); 
  };

  return (
    <div className="flex h-screen relative overflow-hidden select-none">
      <WebCircleOne onDotClick={handleDotClick} />
      {showCircleTwo && <WebCircleTwo />}
    </div>
  );
};

export default WebIndustries;

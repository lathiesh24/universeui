import React, { useState } from "react";
import WebCircleOne from "./WebCircleOne";
import WebCircleTwo from "./WebCircleTwo";
import WebCircleThree from "./WebCircleThree";

const WebCombined = () => {
  const [currentCircle, setCurrentCircle] = useState(1);

  const handleCircleClick = () => {
    if (currentCircle === 1) {
      setCurrentCircle(2);
    } else if (currentCircle === 2) {
      setCurrentCircle(3);
    }
  };

  return (
    <div>
      {currentCircle === 1 && (
        <WebCircleOne onCircleClick={handleCircleClick} />
      )}
      {currentCircle === 2 && (
        <WebCircleTwo onCircleClick={handleCircleClick} />
      )}
      {currentCircle === 3 && <WebCircleThree />}
    </div>
  );
};

export default WebCombined;

import React, { useState } from "react";
import WebCircleOne from "./WebCircleOne";
import WebCircleTwo from "./WebCircleTwo";
import WebCircleThree from "./WebCircleThree";

const WebCombined = () => {
  // State to track the current circle component
  const [currentCircle, setCurrentCircle] = useState(1);

  // Function to handle the change between circles
  const handleCircleClick = () => {
    if (currentCircle === 1) {
      setCurrentCircle(2); // Show WebCircleTwo when a dot in WebCircleOne is clicked
    } else if (currentCircle === 2) {
      setCurrentCircle(3); // Show WebCircleThree when a dot in WebCircleTwo is clicked
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

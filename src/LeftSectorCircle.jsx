import React, { useState, useEffect, useRef } from "react";

const WebCircleOne = ({ onCircleClick }) => {
  const radius = 328; // Radius for positioning the smaller circles
  const centerX = 0; // X position of the center of the main circle
  const centerY = 334; // Y position of the center of the main circle
  const numCircles = 8; // Number of small circles around the main circle

  const [currentAngle, setCurrentAngle] = useState(0); // Angle offset for rotation
  const [isDragging, setIsDragging] = useState(false); // Track if dragging is active
  const startY = useRef(null); // Track the initial Y position when dragging starts
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Track the index of the highlighted sector

  const circleNames = [
    "Sector 1",
    "Sector 2",
    "Sector 3",
    "Sector 4",
    "Sector 5",
    "Sector 6",
    "Sector 7",
    "Sector 8",
  ];

  // Calculate positions of all circles based on the current angle
  const circlePositions = Array.from({ length: numCircles }, (_, i) => {
    const angle = currentAngle + (i * 2 * Math.PI) / numCircles;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  });

  // Update the highlighted index based on the current angle
  const updateHighlightedIndex = () => {
    const closestIndex =
      Math.round((currentAngle / (2 * Math.PI)) * numCircles) % numCircles;
    setHighlightedIndex((closestIndex + numCircles) % numCircles); // Ensure positive index
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startY.current = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY.current;
    setCurrentAngle((prev) => prev + deltaY * 0.01); // Update the angle based on drag distance
    startY.current = e.clientY;
    updateHighlightedIndex(); // Update which dot is the middle one
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (index) => {
    const targetAngle =
      (index - highlightedIndex) * ((2 * Math.PI) / numCircles);
    setCurrentAngle((prev) => prev + targetAngle); // Rotate to make clicked dot the middle
    setHighlightedIndex(index);
    if (onCircleClick) {
      onCircleClick();
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="flex items-center justify-start h-screen w-1/2"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <img src="/round1.png" alt="" className="h-[450px]" />
      <div className="absolute left-8">
        <img src="innercircle1.png" alt="" className="h-[650px] w-80" />
      </div>

      {circlePositions.map((pos, index) => (
        <div
          key={index}
          className="absolute pointer"
          onClick={() => handleClick(index)}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            cursor: "pointer",
          }}
        >
          <div
            className={`rounded-full ${
              index === highlightedIndex
                ? "bg-[#3AB8FF] border-[#FFEFA7] border-2 w-10 h-10" // Middle dot style
                : "bg-[#D8D8D8] w-8 h-8" // Other dots style
            } relative`}
          ></div>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-full ml-4 text-sm font-medium text-black">
            {circleNames[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebCircleOne;

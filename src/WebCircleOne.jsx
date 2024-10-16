import React, { useState, useEffect } from "react";

const WebCircleOne = ({ onDotClick }) => {
  const radius = 326; // Radius for positioning the smaller circles
  const centerX = 2; // X position of the center of the main circle
  const centerY = 348; // Y position of the center of the main circle
  const numCircles = 8; // Number of small circles around the main circle

  const [isDragging, setIsDragging] = useState(false); // Track if dragging is active
  const [highlightedIndex, setHighlightedIndex] = useState(4); // Track the index of the highlighted sector (start at index 4)
  const [angleOffset, setAngleOffset] = useState(0); // To track rotation angle offset

  // Circle names for display
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

  // Calculate circle positions based on the current angle
  const circlePositions = Array.from({ length: numCircles }, (_, i) => {
    const angle = (i * 2 * Math.PI) / numCircles + angleOffset; // Apply angle offset for rotation
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  });

  // Update the highlighted index based on Y-position of the mouse
  const updateHighlightedIndex = (yPosition) => {
    const relativeY = yPosition - centerY; // Relative Y position
    const normalizedAngle = Math.atan2(relativeY, radius); // Calculate the angle
    const adjustedAngle = normalizedAngle - angleOffset; // Adjust angle by the current offset
    const closestIndex = Math.floor(
      ((adjustedAngle + Math.PI) / (2 * Math.PI)) * numCircles
    ); // Find closest index
    setHighlightedIndex((closestIndex + numCircles) % numCircles); // Update the highlighted index
  };

  // Handle when mouse is clicked down (drag starts)
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default to avoid text selection
    setIsDragging(true);
    updateHighlightedIndex(e.clientY); // Update the highlighted index
  };

  // Handle mouse movement when dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only process if dragging

    // Calculate angle change based on mouse movement
    const deltaY = e.movementY; // Vertical mouse movement
    const rotationSpeed = 0.01; // Control rotation speed
    setAngleOffset((prevAngle) => prevAngle + deltaY * rotationSpeed); // Update angle offset

    updateHighlightedIndex(e.clientY); // Update highlighted index based on mouse position
  };

  // Handle when mouse is released (drag ends)
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  // Handle event listeners for mouse movements
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
      className="flex items-center justify-start h-screen w-1/2 relative"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Main Circle */}
      <img src="/round1.png" alt="Background" className="h-[450px]" />

      {/* Inner Circle */}
      <div className="absolute left-8">
        <img
          src="innercircle1.png"
          alt="Inner Circle"
          className="h-[650px] w-80"
        />
      </div>

      {/* Render smaller circles */}
      {circlePositions.map((pos, index) => (
        <div
          key={index}
          className="absolute"
          onClick={onDotClick} // Trigger the event to open WebCircleTwo
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            cursor: "pointer",
          }}
        >
          <div
            className={`rounded-full transition-all duration-200 ease-in-out ${
              index === highlightedIndex
                ? "bg-[#3AB8FF] border-[#FFEFA7] border-2 w-10 h-10"
                : "bg-[#D8D8D8] w-8 h-8"
            } relative`}
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 left-full ml-4 text-sm font-medium text-black w-40">
            {circleNames[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebCircleOne;

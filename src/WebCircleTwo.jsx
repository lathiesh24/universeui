import React, { useState, useEffect, useRef } from "react";

const WebCircleTwo = () => {
  const radius = 315; // Radius for positioning the smaller circles
  const centerX = 1515; // X position of the center of the main circle
  const centerY = 338; // Y position of the center of the main circle
  const numCircles = 8; // Number of small circles around the main circle

  const [currentAngle, setCurrentAngle] = useState(0); // Angle offset for rotation
  const [isDragging, setIsDragging] = useState(false); // Track if dragging is active
  const startY = useRef(null); // Track the initial Y position when dragging starts
  const [highlightedIndex, setHighlightedIndex] = useState(4); // Start with Sector 5 (index 4) at the top

  // Array of names for the circles
  const circleNames = [
    "Sector 1",
    "Sector 2",
    "Sector 3",
    "Sector 4",
    "Sector 5", // Middle dot (starting highlighted one)
    "Sector 6",
    "Sector 7",
    "Sector 8",
  ];

  // Generate positions for circles based on current angle offset
  const circlePositions = Array.from({ length: numCircles }, (_, i) => {
    const angle = currentAngle + (i * 2 * Math.PI) / numCircles; // Calculate angle with offset
    const x = centerX + radius * Math.cos(angle); // X position based on the angle
    const y = centerY + radius * Math.sin(angle); // Y position based on the angle
    return { x, y };
  });

  // Function to find the index of the dot closest to the top position (0 degrees)
  const findTopIndex = () => {
    // Normalize the angle to be between 0 and 2 * Math.PI
    const normalizedAngle =
      ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const sectorAngle = (2 * Math.PI) / numCircles; // Angle per sector
    const topIndex = Math.round(normalizedAngle / sectorAngle) % numCircles; // Find the closest sector to the top
    setHighlightedIndex((numCircles - topIndex) % numCircles); // Adjust for correct index (top)
  };

  // Handle when dragging starts (mouse down)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startY.current = e.clientY; // Track the Y position of the mouse when dragging starts
  };

  // Handle mouse movement while dragging (mouse move)
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY.current; // Calculate how much the mouse has moved vertically
    setCurrentAngle((prev) => prev - deltaY * 0.01); // Adjust angle based on vertical movement
    startY.current = e.clientY; // Update starting Y position for smooth dragging
  };

  // Handle when dragging ends (mouse up)
  const handleMouseUp = () => {
    setIsDragging(false); // Stop the dragging process
    findTopIndex(); // Update the highlighted sector after dragging ends
  };

  // Handle clicking on a circle to rotate it to the middle
  const handleClick = (index) => {
    const targetAngle =
      (highlightedIndex - index) * ((2 * Math.PI) / numCircles); // Calculate the required angle to bring the clicked circle to the top
    setCurrentAngle((prev) => prev + targetAngle); // Rotate the circles
    setHighlightedIndex(index); // Highlight the clicked sector
  };

  // Add event listeners for mouse move and mouse up
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

  // Ensure the highlighted index updates dynamically when the angle changes
  useEffect(() => {
    findTopIndex(); // Update the highlighted index based on the current angle
  }, [currentAngle]);

  return (
    <div
      className="flex items-center justify-end h-screen w-1/2 overflow-x-hidden"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <img
        src="/round2.png"
        alt="Background"
        className="h-[450px]" // Main circle size
      />
      <div className="absolute right-0">
        <img
          src="/innercircle2.png"
          alt="Inner Circle"
          className="h-[650px] w-80"
        />
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
            className={`rounded-full transition-all duration-200 ease-in-out ${
              index === highlightedIndex // Highlight the top sector
                ? "bg-[#3AB8FF] border-[#FFEFA7] border-2 w-10 h-10" // Highlight style for top sector
                : "bg-[#D8D8D8] w-8 h-8" // Normal style for other sectors
            } relative`}
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 right-full text-right mr-4 text-sm font-medium text-black w-32">
            {circleNames[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebCircleTwo;

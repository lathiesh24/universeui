import React, { useState } from "react";
import sectorsData from "./data/sector_data.json"; // Import the JSON data

const CurvedLineUp = () => {
  const radius = 200; // Radius of the curve
  const centerX = radius; // Center the topmost dot horizontally
  const centerY = 0; // Y position for the topmost dot (you can adjust this for your design)

  // Extract sector names from the JSON data
  const sectorNames = sectorsData.sectors.map((sector) => sector.sectorName);

  // Define the fixed positions for the three dots along the curve
  const fixedAngles = [
    -Math.PI / 2, // Top center (90°)
    -Math.PI / 4, // Middle right (45°)
    0, // Bottom right (0°)
  ];

  // Use the sector names for the text data
  const allTexts =
    sectorNames.length > 0 ? sectorNames : ["No Sectors Available"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTouchStart = (e) => {
    if (isAnimating) return; // Prevent interaction during animation
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null || isAnimating) return;

    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 50) {
      handleScroll("prev");
      setStartX(e.touches[0].clientX); // Reset startX to the new position
    } else if (deltaX < -50) {
      handleScroll("next");
      setStartX(e.touches[0].clientX); // Reset startX to the new position
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const handleScroll = (direction) => {
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % allTexts.length
          : (prevIndex - 1 + allTexts.length) % allTexts.length
      );
      setIsAnimating(false);
    }, 500); // Match this duration with the CSS transition duration
  };

  return (
    <div
      className="relative bg-gray-100 flex justify-end items-start select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        <img src="/circleup1.svg" alt="" className="w-40" />
      </div>

      <div className="absolute">
        <div className="relative w-60">
          <div>
            <img src="/circleup2.svg" alt="" className="w-60" />
          </div>
          {fixedAngles.map((angle, index) => {
            const newAngle = angle + (isAnimating ? Math.PI / 4 : 0); // Adjust angle during animation
            const x = centerX + radius * Math.sin(newAngle); // Corrected for rightward movement
            const y = centerY + radius * Math.cos(newAngle); // Corrected for downward movement

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out`}
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <div className="relative w-8 h-8 bg-blue-500 rounded-full">
                  {/* Positioning the text to the left of the dot */}
                  <div className="absolute right-full mr-4 text-black text-sm w-32 text-right">
                    {allTexts[(currentIndex + index) % allTexts.length]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurvedLineUp;

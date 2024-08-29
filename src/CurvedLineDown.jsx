import React, { useState } from "react";
import sectorsData from "./data/sector_data.json"; // Correctly import the JSON file

const CurvedLineDown = () => {
  const radius = 180;
  const centerX = radius;
  const centerY = radius;

  // Extract industry names from a specific sector (e.g., BFSI)
  const bfsiSector = sectorsData.sectors.find(
    (sector) => sector.sectorId === "bfsi"
  );

  const industryNames = bfsiSector
    ? bfsiSector.industries.map((industry) => industry.industryName)
    : ["No Industries Found"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTouchStart = (e) => {
    if (isAnimating) return;
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null || isAnimating) return;

    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 50) {
      handleScroll("prev");
      setStartX(e.touches[0].clientX);
    } else if (deltaX < -50) {
      handleScroll("next");
      setStartX(e.touches[0].clientX);
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
          ? (prevIndex + 1) % industryNames.length
          : (prevIndex - 1 + industryNames.length) % industryNames.length
      );
      setIsAnimating(false);
    }, 500);
  };

  const fixedAngles = [Math.PI, (3 * Math.PI) / 4, Math.PI / 2];

  return (
    <div
      className="relative bg-gray-100 flex justify-end items-end select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        <img src="/circle.svg" alt="" className="w-40" />
      </div>

      <div className="absolute">
        <div className="relative w-60">
          <div>
            <img src="/circle2.svg" alt="" className="w-60" />
          </div>
          {fixedAngles.map((angle, index) => {
            const newAngle = angle + (isAnimating ? Math.PI / 4 : 0);
            const x = centerX + radius * Math.cos(newAngle);
            const y = centerY - radius * Math.sin(newAngle);

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out`}
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <div className="relative w-8 h-8 bg-blue-500 rounded-full">
                  <div className="absolute right-full mr-4 text-black text-sm w-32 text-right">
                    {
                      industryNames[
                        (currentIndex + index) % industryNames.length
                      ]
                    }
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

export default CurvedLineDown;

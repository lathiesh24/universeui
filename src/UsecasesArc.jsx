import React, { useState } from "react";
import sectorsData from "./data/sector_data.json"; // Import the JSON data

const UsecasesAec = () => {
  const radius1 = 200; // Radius of the first arc
  const radius2 = 320; // Radius of the second arc
  const centerX1 = radius1; // Center the first arc's topmost dot horizontally
  const centerY1 = 0; // Y position for the first arc's topmost dot
  const centerX2 = radius2; // Center the second arc's topmost dot horizontally
  const centerY2 = 0; // Y position for the second arc's topmost dot

  // Extract sector names for the first arc's dots
  const sectorNames = sectorsData.sectors.map((sector) => sector.sectorName);

  // Extract technology names for the second arc's dots
  const bfsiSector = sectorsData.sectors.find(
    (sector) => sector.sectorId === "bfsi"
  );
  const lifeHealthInsurance = bfsiSector.industries.find(
    (industry) => industry.industryId === "lifeHealthInsurance"
  );
  const technologyNames = lifeHealthInsurance.technologies.map(
    (tech) => tech.technologyName
  );

  // Define the fixed positions for the three dots along each arc
  const fixedAnglesArc1 = [
    -Math.PI / 2, // Top center (90°)
    -Math.PI / 4, // Middle right (45°)
    0, // Bottom right (0°)
  ];

  const fixedAnglesArc2 = [
    -Math.PI / 2, // Top center (90°)
    -Math.PI / 4, // Middle right (30°)
    0, // Bottom right (0°)
  ];

  // Use the sector names for the text data
  const allTexts1 =
    sectorNames.length > 0 ? sectorNames : ["No Sectors Available"];
  const allTexts2 =
    technologyNames.length > 0
      ? technologyNames
      : ["No Technologies Available"];

  const [currentIndexArc1, setCurrentIndexArc1] = useState(0);
  const [currentIndexArc2, setCurrentIndexArc2] = useState(0);
  const [startXArc1, setStartXArc1] = useState(null);
  const [startXArc2, setStartXArc2] = useState(null);
  const [isAnimatingArc1, setIsAnimatingArc1] = useState(false);
  const [isAnimatingArc2, setIsAnimatingArc2] = useState(false);

  // Handlers for the first arc
  const handleTouchStartArc1 = (e) => {
    if (isAnimatingArc1) return;
    setStartXArc1(e.touches[0].clientX);
  };

  const handleTouchMoveArc1 = (e) => {
    if (startXArc1 === null || isAnimatingArc1) return;

    const deltaX = e.touches[0].clientX - startXArc1;

    if (deltaX > 50) {
      handleScrollArc1("prev");
      setStartXArc1(e.touches[0].clientX);
    } else if (deltaX < -50) {
      handleScrollArc1("next");
      setStartXArc1(e.touches[0].clientX);
    }
  };

  const handleTouchEndArc1 = () => {
    setStartXArc1(null);
  };

  const handleScrollArc1 = (direction) => {
    setIsAnimatingArc1(true);

    setTimeout(() => {
      setCurrentIndexArc1((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % allTexts1.length
          : (prevIndex - 1 + allTexts1.length) % allTexts1.length
      );
      setIsAnimatingArc1(false);
    }, 500);
  };

  // Handlers for the second arc
  const handleTouchStartArc2 = (e) => {
    if (isAnimatingArc2) return;
    setStartXArc2(e.touches[0].clientX);
  };

  const handleTouchMoveArc2 = (e) => {
    if (startXArc2 === null || isAnimatingArc2) return;

    const deltaX = e.touches[0].clientX - startXArc2;

    if (deltaX > 50) {
      handleScrollArc2("prev");
      setStartXArc2(e.touches[0].clientX);
    } else if (deltaX < -50) {
      handleScrollArc2("next");
      setStartXArc2(e.touches[0].clientX);
    }
  };

  const handleTouchEndArc2 = () => {
    setStartXArc2(null);
  };

  const handleScrollArc2 = (direction) => {
    setIsAnimatingArc2(true);

    setTimeout(() => {
      setCurrentIndexArc2((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % allTexts2.length
          : (prevIndex - 1 + allTexts2.length) % allTexts2.length
      );
      setIsAnimatingArc2(false);
    }, 500);
  };

  return (
    <div>
      <div className="relative  flex justify-end items-start select-none">
        {/* First Arc */}
        <div
          onTouchStart={handleTouchStartArc1}
          onTouchMove={handleTouchMoveArc1}
          onTouchEnd={handleTouchEndArc1}
        >
          <img src="/circleup1.svg" alt="" className="w-40" />
        </div>

        <div className="absolute">
          <div className="relative w-60">
            <div>
              <img src="/circleup2.svg" alt="" className="w-60" />
            </div>
            {fixedAnglesArc1.map((angle, index) => {
              const newAngle = angle + (isAnimatingArc1 ? Math.PI / 4 : 0);
              const x = centerX1 + radius1 * Math.sin(newAngle);
              const y = centerY1 + radius1 * Math.cos(newAngle);

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out`}
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div className="relative w-8 h-8 bg-blue-500 rounded-full">
                    <div className="absolute right-full mr-4 text-black text-sm w-32 text-right">
                      {allTexts1[(currentIndexArc1 + index) % allTexts1.length]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Second Arc */}
        <div
          className="absolute"
          onTouchStart={handleTouchStartArc2}
          onTouchMove={handleTouchMoveArc2}
          onTouchEnd={handleTouchEndArc2}
        >
          <div className="relative w-[380px]">
            <div>
              <img src="/circleup2.svg" alt="" className="w-[380px]" />
            </div>
            {fixedAnglesArc2.map((angle, index) => {
              const newAngle = angle + (isAnimatingArc2 ? Math.PI / 4 : 0);
              const x = centerX2 + radius2 * Math.sin(newAngle);
              const y = centerY2 + radius2 * Math.cos(newAngle);

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out`}
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div className="relative w-8 h-8 bg-red-500 rounded-full">
                    <div className="absolute right-full mr-4 text-black text-sm w-32 text-right">
                      {allTexts2[(currentIndexArc2 + index) % allTexts2.length]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsecasesAec;

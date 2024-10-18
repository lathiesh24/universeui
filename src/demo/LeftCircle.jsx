import React, { useState, useEffect, useRef } from "react";
import sectorData from "../data/sector_data.json"; 

const FirstLeftCircle = () => {
  const sectors = sectorData.sectors;

  const getInitialIndustryData = () => {
      const bfsiSector = sectors.find((sector) => sector.sectorId === "bfsi");

      return bfsiSector
        ? bfsiSector.industries.slice(0, 8).map((industry) => ({
            sectorName: bfsiSector.sectorName,
            industryName: industry.industryName,
            technologies: industry.technologies || [],
          }))
        : [];
    };

  const [outerCircleData, setOuterCircleData] = useState(
    getInitialIndustryData()
  );
  const totalDots = outerCircleData.length;
  const anglePerDot = (2 * Math.PI) / totalDots;
  const [angleOffset, setAngleOffset] = useState(Math.PI / 2);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseY, setLastMouseY] = useState(null);
  const circleRef = useRef(null);

  const radiusX = 410;
  const radiusY = 378;

  const getSectorData = () => {
    return sectors.slice(0, 8).map((sector) => ({
      sectorId: sector.sectorId,
      sectorName: sector.sectorName,
      industries: sector.industries || [],
    }));
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        handleMouseMoveHandler(event);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setLastMouseY(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, lastMouseY]);

  const handleMouseMoveHandler = (event) => {
    const { clientY } = event;
    if (lastMouseY !== null) {
      const deltaY = clientY - lastMouseY;
      const rotationSpeed = 0.005;
      setAngleOffset((prevOffset) => prevOffset - deltaY * rotationSpeed);
    }
    setLastMouseY(clientY);
  };

  const handleMouseDown = (event) => {
    if (circleRef.current && circleRef.current.contains(event.target)) {
      setIsDragging(true);
      setLastMouseY(event.clientY);
    }
  };

  const handleDotClick = (dotIndex) => {
    const normalizedAngleOffset =
      ((angleOffset % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const currentCenterIndex = Math.round(
      ((Math.PI / 2 - normalizedAngleOffset) / anglePerDot + totalDots) %
        totalDots
    );

    const distance = (dotIndex - currentCenterIndex + totalDots) % totalDots;
    const shortestDistance =
      distance <= totalDots / 2 ? distance : distance - totalDots;
    const angleDifference = shortestDistance * anglePerDot;

    setAngleOffset((prevOffset) => prevOffset - angleDifference);
  };

  const dots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + angleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const centerIndex = Math.round(
    ((Math.PI / 2 - angleOffset) / anglePerDot + totalDots) % totalDots
  );

  return (
    <div
      className="fixed top-0 left-0 h-full w-[432px] rounded-r-full border-2"
      ref={circleRef}
      onMouseDown={handleMouseDown}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="absolute h-[500px] w-[250px] rounded-r-full border-2 top-32"></div>

      {/* Display only 8 dots */}
      {dots.map((dot) => {
        const isMiddleDot = dot.index === centerIndex;

        return (
          <div
            key={dot.index}
            className="absolute flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y + 346}px`,
              userSelect: "none",
            }}
            onMouseDown={() => {
              setIsDragging(true);
              setLastMouseY(null);
            }}
            onClick={() => handleDotClick(dot.index)}
          >
            <div
              className={`flex flex-row items-center justify-center ${
                isMiddleDot ? "border-blue-500" : "border-black"
              }`}
              style={{ textAlign: "center" }}
            >
              <div
                className={`rounded-full flex items-center justify-center ${
                  isMiddleDot
                    ? "bg-[#3AB8FF] border-[#FFEFA7] border-2 "
                    : "bg-[#D8D8D8]"
                }  ${isMiddleDot ? "w-10 h-10" : "w-8 h-8"}`}
                style={{ flexShrink: 0 }}
              >
                {/* Removed number display */}
              </div>
              <div
                className={`text-sm w-32 ${
                  isMiddleDot
                    ? "font-semibold text-base text-[#4C4C4C]"
                    : "text-[#797979]"
                }`}
                style={{ wordWrap: "break-word", whiteSpace: "normal" }}
              >
                {outerCircleData[dot.index].industryName || "N/A"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FirstLeftCircle;

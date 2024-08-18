import React, { useState, useEffect, useRef } from "react";

const TopSemicircle = () => {
  const totalDots = 7; // Total number of dots
  const anglePerDot = (2 * Math.PI) / (totalDots * 2); // Increase the angle between dots by reducing the effective number of visible dots
  // Angle per dot

  const industryNames = [
    "Technology",
    "Healthcare",
    "Finance",
    "Energy",
    "Retail",
    "Automotive",
    "Telecom",
    "Education",
    "Real Estate",
    "Food & Beverage",
    "Pharmaceuticals",
    "Aerospace",
  ];

  const [angleOffset, setAngleOffset] = useState(Math.PI / 2);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(null);

  const circleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const { clientX } = event;
        if (lastMouseX !== null) {
          const deltaX = clientX - lastMouseX;
          const rotationSpeed = 0.005;
          setAngleOffset((prevOffset) => prevOffset - deltaX * rotationSpeed);
        }
        setLastMouseX(clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setLastMouseX(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, lastMouseX]);

  const handleMouseDown = (event) => {
    if (circleRef.current && circleRef.current.contains(event.target)) {
      setIsDragging(true);
      setLastMouseX(event.clientX);
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

  const radiusX = 160;
  const radiusY = 160;
  const dots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + angleOffset;
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);
    return { x, y, index };
  });

  const centerIndex = Math.round(
    ((Math.PI / 2 - angleOffset) / anglePerDot + totalDots) % totalDots
  );

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div
        className="relative w-[300px] h-[150px] rounded-b-full border-2"
        ref={circleRef}
        onMouseDown={handleMouseDown}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute w-[200px] h-[100px] rounded-b-full border-2 top-0 left-1/2 transform -translate-x-1/2"></div>

        {dots.map((dot) => (
          <div
            key={dot.index}
            className="absolute flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: `${dot.x + 120}px`,
              top: `${dot.y - 28}px`,
              userSelect: "none",
            }}
            onClick={() => handleDotClick(dot.index)}
          >
            <div
              className={`flex gap-4 flex-col justify-center items-center ${
                dot.index === centerIndex ? "border-blue-500" : "border-black"
              }`}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-7 h-7 flex items-center justify-center ${
                  dot.index === centerIndex ? "border-blue-500" : ""
                }`}
              >
                {dot.index + 1}
              </div>
              <div className="text-sm flex items-center justify-center">{industryNames[dot.index]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSemicircle;

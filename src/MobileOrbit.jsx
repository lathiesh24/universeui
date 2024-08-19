import React, { useState, useEffect, useRef } from "react";

const TopBottomSemicircles = () => {
  const totalDots = 7; // Total number of dots for both semicircles
  const visibleDots = 3; // Number of visible dots at a time
  const anglePerDot = (2 * Math.PI) / totalDots; // Angle per dot

  const industryNamesTop = [
    "Technology",
    "Healthcare",
    "Finance",
    "Energy",
    "Retail",
    "Automotive",
    "Telecom",
  ];

  const industryNamesInnerTop = [
    "Media",
    "Publishing",
    "Mining",
    "Hospitality",
    "Logistics",
    "Fashion",
    "Construction",
  ];

  const industryNamesMiddle = [
    "Education",
    "Real Estate",
    "Food & Beverage",
    "Pharmaceuticals",
    "Aerospace",
    "Agriculture",
    "Construction",
  ];

  const [angleOffsetTop, setAngleOffsetTop] = useState(0);
  const [angleOffsetInnerTop, setAngleOffsetInnerTop] = useState(0);
  const [angleOffsetMiddle, setAngleOffsetMiddle] = useState(0);
  const [isDraggingTop, setIsDraggingTop] = useState(false);
  const [isDraggingInnerTop, setIsDraggingInnerTop] = useState(false);
  const [isDraggingMiddle, setIsDraggingMiddle] = useState(false);
  const [lastMouseXTop, setLastMouseXTop] = useState(null);
  const [lastMouseXInnerTop, setLastMouseXInnerTop] = useState(null);
  const [lastMouseXMiddle, setLastMouseXMiddle] = useState(null);

  const topCircleRef = useRef(null);
  const innerTopCircleRef = useRef(null);
  const middleCircleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingTop) {
        handleMouseMoveTop(event);
      }
      if (isDraggingInnerTop) {
        handleMouseMoveInnerTop(event);
      }
      if (isDraggingMiddle) {
        handleMouseMoveMiddle(event);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingTop(false);
      setIsDraggingInnerTop(false);
      setIsDraggingMiddle(false);
      setLastMouseXTop(null);
      setLastMouseXInnerTop(null);
      setLastMouseXMiddle(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDraggingTop,
    lastMouseXTop,
    isDraggingInnerTop,
    lastMouseXInnerTop,
    isDraggingMiddle,
    lastMouseXMiddle,
  ]);

  const handleMouseMoveTop = (event) => {
    if (isDraggingTop) {
      const { clientX } = event;
      if (lastMouseXTop !== null) {
        const deltaX = clientX - lastMouseXTop;
        const rotationSpeed = 0.005;
        setAngleOffsetTop((prevOffset) => prevOffset - deltaX * rotationSpeed);
        setAngleOffsetInnerTop(
          (prevOffset) => prevOffset - deltaX * rotationSpeed
        ); // Sync inner dots with outer dots
      }
      setLastMouseXTop(clientX);
    }
  };

  const handleMouseMoveInnerTop = (event) => {
    if (isDraggingInnerTop) {
      const { clientX } = event;
      if (lastMouseXInnerTop !== null) {
        const deltaX = clientX - lastMouseXInnerTop;
        const rotationSpeed = 0.005;
        setAngleOffsetInnerTop(
          (prevOffset) => prevOffset - deltaX * rotationSpeed
        );
      }
      setLastMouseXInnerTop(clientX);
    }
  };

  const handleMouseMoveMiddle = (event) => {
    if (isDraggingMiddle) {
      const { clientX } = event;
      if (lastMouseXMiddle !== null) {
        const deltaX = clientX - lastMouseXMiddle;
        const rotationSpeed = 0.005;
        setAngleOffsetMiddle(
          (prevOffset) => prevOffset - deltaX * rotationSpeed
        );
      }
      setLastMouseXMiddle(clientX);
    }
  };

  const handleMouseDownTop = (event) => {
    if (topCircleRef.current && topCircleRef.current.contains(event.target)) {
      setIsDraggingTop(true);
      setLastMouseXTop(event.clientX);
    }
  };

  const handleMouseDownInnerTop = (event) => {
    if (
      innerTopCircleRef.current &&
      innerTopCircleRef.current.contains(event.target)
    ) {
      setIsDraggingInnerTop(true);
      setLastMouseXInnerTop(event.clientX);
    }
  };

  const handleMouseDownMiddle = (event) => {
    if (
      middleCircleRef.current &&
      middleCircleRef.current.contains(event.target)
    ) {
      setIsDraggingMiddle(true);
      setLastMouseXMiddle(event.clientX);
    }
  };

  const handleDotClickTop = (dotIndex) => {
    handleDotClick(dotIndex, setAngleOffsetTop, angleOffsetTop);
    handleDotClick(dotIndex, setAngleOffsetInnerTop, angleOffsetInnerTop); // Sync inner dots with outer dots
  };

  const handleDotClickInnerTop = (dotIndex) => {
    handleDotClick(dotIndex, setAngleOffsetInnerTop, angleOffsetInnerTop);
  };

  const handleDotClickMiddle = (dotIndex) => {
    handleDotClick(dotIndex, setAngleOffsetMiddle, angleOffsetMiddle);
  };

  const handleDotClick = (dotIndex, setAngleOffset, angleOffset) => {
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

  const radiusX = 230;
  const radiusY = 280;
  const innerRadiusX = 120; // Adjusted for inner circle
  const innerRadiusY = 180; // Adjusted for inner circle

  const dotsTop = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + angleOffsetTop;
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);
    return { x, y, index };
  });

  const dotsInnerTop = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + angleOffsetInnerTop;
    const x = innerRadiusX * Math.cos(angle);
    const y = innerRadiusY * Math.sin(angle);
    return { x, y, index };
  });

  const dotsMiddle = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + angleOffsetMiddle;
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);
    return { x, y, index };
  });

  const centerIndexTop = Math.round(
    ((Math.PI / 2 - angleOffsetTop) / anglePerDot + totalDots) % totalDots
  );

  const centerIndexInnerTop = Math.round(
    ((Math.PI / 2 - angleOffsetInnerTop) / anglePerDot + totalDots) % totalDots
  );

  const centerIndexMiddle = Math.round(
    ((Math.PI / 2 - angleOffsetMiddle) / anglePerDot + totalDots) % totalDots
  );

  const isDotCentered = (index, centerIndex) => {
    const diff = Math.abs(index - centerIndex);
    return diff === 0 || diff === 1 || diff === totalDots - 1; // Show the center and one on either side
  };

  return (
    <div className="flex flex-col overflow-hidden items-center h-screen bg-gray-100">
      <div
        className="relative w-[400px] h-[200px] rounded-b-full border-2"
        ref={topCircleRef}
        onMouseDown={handleMouseDownTop}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute w-[200px] h-[100px] rounded-b-full border-2 top-0 left-1/2 transform -translate-x-1/2"></div>

        {dotsTop
          .filter((dot) => isDotCentered(dot.index, centerIndexTop))
          .map((dot) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                left: `${dot.x + 170}px`,
                top: `${dot.y - 100}px`,
                userSelect: "none",
              }}
              onClick={() => handleDotClickTop(dot.index)}
            >
              <div
                className={`flex gap-4 flex-col justify-center items-center ${
                  dot.index === centerIndexTop
                    ? "border-blue-500"
                    : "border-black"
                }`}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-7 h-7 flex items-center justify-center ${
                    dot.index === centerIndexTop ? "border-blue-500" : ""
                  }`}
                >
                  {dot.index + 1}
                </div>
                <div className="text-sm flex items-center justify-center">
                  {industryNamesTop[dot.index]}
                </div>
              </div>
            </div>
          ))}

        <div
          className="absolute w-[140px] h-[70px] rounded-b-full border-2 top-0 left-1/2 transform -translate-x-1/2 z-50"
          ref={innerTopCircleRef}
          onMouseDown={handleMouseDownInnerTop}
          onClick={(event) => event.stopPropagation()}
        ></div>

        {dotsInnerTop
          .filter((dot) => isDotCentered(dot.index, centerIndexInnerTop))
          .map((dot) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                left: `${dot.x + 170}px`,
                top: `${dot.y - 100}px`,
                userSelect: "none",
              }}
              onClick={() => handleDotClickInnerTop(dot.index)}
            >
              <div
                className={`flex gap-4 flex-col justify-center items-center ${
                  dot.index === centerIndexInnerTop
                    ? "border-blue-500"
                    : "border-black"
                }`}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-7 h-7 flex items-center justify-center ${
                    dot.index === centerIndexInnerTop ? "border-blue-500" : ""
                  }`}
                >
                  {dot.index + 1}
                </div>
                <div className="text-sm flex items-center justify-center">
                  {industryNamesInnerTop[dot.index]}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div
        className="relative w-[300px] h-[150px] rounded-t-full border-2 mt-10"
        ref={middleCircleRef}
        onMouseDown={handleMouseDownMiddle}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute w-[200px] h-[100px] rounded-t-full border-2 bottom-0 left-1/2 transform -translate-x-1/2"></div>

        {/* {dotsMiddle.map((dot) => (
          <div
            key={dot.index}
            className="absolute flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: `${dot.x + 120}px`,
              bottom: `${dot.y - 50}px`, // Adjusted to attach to the bottom
              userSelect: "none",
            }}
            onClick={() => handleDotClickMiddle(dot.index)}
          >
            <div
              className={`flex gap-4 flex-col justify-center items-center ${
                dot.index === centerIndexMiddle
                  ? "border-blue-500"
                  : "border-black"
              }`}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-7 h-7 flex items-center justify-center ${
                  dot.index === centerIndexMiddle ? "border-blue-500" : ""
                }`}
              >
                {dot.index + 1}
              </div>
              <div className="text-sm flex items-center justify-center">
                {industryNamesMiddle[dot.index]}
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default TopBottomSemicircles;

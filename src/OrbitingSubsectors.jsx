import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const totalDots = 12; // Total number of dots
  const anglePerDot = (2 * Math.PI) / totalDots; // Angle per dot

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

  // Initial data for the middle left circle
  const initialMiddleIndustryNames = [
    "Agriculture",
    "Construction",
    "Fashion",
    "Hospitality",
    "Logistics",
    "Media",
    "Mining",
    "Publishing",
    "Software",
    "Tourism",
    "Transportation",
    "Utilities",
  ];

  // Data for the first right semicircle
  const firstRightIndustryNames = [
    "Manufacturing",
    "Biotechnology",
    "Insurance",
    "Banking",
    "Consulting",
    "Legal",
    "Marketing",
    "Technology Services",
    "Government",
    "Non-Profit",
    "Entertainment",
    "Sports",
  ];

  // Data for the second right semicircle
  const secondRightIndustryNames = [
    "Transportation",
    "Supply Chain",
    "Tourism",
    "Agriculture",
    "Television",
    "Music",
    "Publishing",
    "Telecommunications",
    "Architecture",
    "Urban Planning",
    "Environment",
    "Forestry",
  ];

  const [leftAngleOffset, setLeftAngleOffset] = useState(Math.PI / 2);
  const [middleAngleOffset, setMiddleAngleOffset] = useState(Math.PI / 2);
  const [rightAngleOffset, setRightAngleOffset] = useState(Math.PI / 2);
  const [secondRightAngleOffset, setSecondRightAngleOffset] = useState(
    Math.PI / 2
  );
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingMiddle, setIsDraggingMiddle] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isDraggingSecondRight, setIsDraggingSecondRight] = useState(false);
  const [lastMouseYLeft, setLastMouseYLeft] = useState(null);
  const [lastMouseYMiddle, setLastMouseYMiddle] = useState(null);
  const [lastMouseYRight, setLastMouseYRight] = useState(null);
  const [lastMouseYSecondRight, setLastMouseYSecondRight] = useState(null);
  const [openVerticalLine, setOpenVerticalLine] = useState(false);
  const [rightSemicircleOpen, setRightSemicircleOpen] = useState(false); // State for right semicircle visibility
  const [useSecondRightSemicircle, setUseSecondRightSemicircle] =
    useState(false); // State to switch between first and second right semicircles
  const [showMiddleCircle, setShowMiddleCircle] = useState(false); // State to control middle circle visibility
  const [middleIndustryNames, setMiddleIndustryNames] = useState(
    initialMiddleIndustryNames
  ); // State to control the data in the middle circle

  const leftCircleRef = useRef(null);
  const middleCircleRef = useRef(null);
  const rightCircleRef = useRef(null);
  const secondRightCircleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingLeft) {
        handleMouseMoveLeft(event);
      }
      if (isDraggingMiddle) {
        handleMouseMoveMiddle(event);
      }
      if (isDraggingRight) {
        handleMouseMoveRight(event);
      }
      if (isDraggingSecondRight) {
        handleMouseMoveSecondRight(event);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDraggingLeft,
    lastMouseYLeft,
    isDraggingMiddle,
    lastMouseYMiddle,
    isDraggingRight,
    lastMouseYRight,
    isDraggingSecondRight,
    lastMouseYSecondRight,
  ]);

  const handleMouseMoveLeft = (event) => {
    if (isDraggingLeft) {
      const { clientY } = event;
      if (lastMouseYLeft !== null) {
        const deltaY = clientY - lastMouseYLeft;
        const rotationSpeed = 0.005;
        setLeftAngleOffset((prevOffset) => prevOffset - deltaY * rotationSpeed);
      }
      setLastMouseYLeft(clientY);
    }
  };

  const handleMouseMoveMiddle = (event) => {
    if (isDraggingMiddle) {
      const { clientY } = event;
      if (lastMouseYMiddle !== null) {
        const deltaY = clientY - lastMouseYMiddle;
        const rotationSpeed = 0.005;
        setMiddleAngleOffset(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYMiddle(clientY);
    }
  };

  const handleMouseMoveRight = (event) => {
    if (isDraggingRight) {
      const { clientY } = event;
      if (lastMouseYRight !== null) {
        const deltaY = clientY - lastMouseYRight;
        const rotationSpeed = 0.005;
        setRightAngleOffset(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYRight(clientY);
    }
  };

  const handleMouseMoveSecondRight = (event) => {
    if (isDraggingSecondRight) {
      const { clientY } = event;
      if (lastMouseYSecondRight !== null) {
        const deltaY = clientY - lastMouseYSecondRight;
        const rotationSpeed = 0.005;
        setSecondRightAngleOffset(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYSecondRight(clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingMiddle(false);
    setIsDraggingRight(false);
    setIsDraggingSecondRight(false);
    setLastMouseYLeft(null);
    setLastMouseYMiddle(null);
    setLastMouseYRight(null);
    setLastMouseYSecondRight(null);
  };

  const handleMouseDownLeft = (event) => {
    if (leftCircleRef.current && leftCircleRef.current.contains(event.target)) {
      setIsDraggingLeft(true);
      setLastMouseYLeft(event.clientY);
    }
  };

  const handleMouseDownMiddle = (event) => {
    if (
      middleCircleRef.current &&
      middleCircleRef.current.contains(event.target)
    ) {
      setIsDraggingMiddle(true);
      setLastMouseYMiddle(event.clientY);
    }
  };

  const handleMouseDownRight = (event) => {
    if (
      rightCircleRef.current &&
      rightCircleRef.current.contains(event.target)
    ) {
      setIsDraggingRight(true);
      setLastMouseYRight(event.clientY);
    }
  };

  const handleMouseDownSecondRight = (event) => {
    if (
      secondRightCircleRef.current &&
      secondRightCircleRef.current.contains(event.target)
    ) {
      setIsDraggingSecondRight(true);
      setLastMouseYSecondRight(event.clientY);
    }
  };

  const handleDotClickLeft = (dotIndex) => {
    handleDotClick(dotIndex, setLeftAngleOffset, leftAngleOffset);
    handleOpenVerticalLine(dotIndex);
  };

  const handleDotClickMiddle = (dotIndex) => {
    handleDotClick(dotIndex, setMiddleAngleOffset, middleAngleOffset);
  };

  const handleOpenVerticalLine = (dotIndex) => {
    if (dotIndex === leftCenterIndex) {
      setOpenVerticalLine(true); // Open the vertical line dots on first click
    }
  };

  const handleVerticalDotClick = () => {
    setRightSemicircleOpen(true); // Open the first right semicircle when a vertical line dot is clicked
  };

  const handleRightSemicircleClick = () => {
    setMiddleIndustryNames(firstRightIndustryNames); // Move data from the first right semicircle to the middle semicircle
    setShowMiddleCircle(true); // Show the middle circle
    setUseSecondRightSemicircle(true); // Show the second right semicircle
  };

  const handleDotClickRight = (dotIndex) => {
    handleDotClick(dotIndex, setRightAngleOffset, rightAngleOffset);
    handleRightSemicircleClick(); // Move data and show the second right semicircle on first right semicircle click
  };

  const handleDotClickSecondRight = (dotIndex) => {
    handleDotClick(dotIndex, setSecondRightAngleOffset, secondRightAngleOffset);
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

  const radiusX = 410;
  const radiusY = 378;
  const leftDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + leftAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const middleRadiusX = 230;
  const middleRadiusY = 248;
  const middleDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + middleAngleOffset;
    const x = middleRadiusX * Math.sin(angle);
    const y = middleRadiusY * Math.cos(angle);
    return { x, y, index };
  });

  const rightDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + rightAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const secondRightDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + secondRightAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const leftCenterIndex = Math.round(
    ((Math.PI / 2 - leftAngleOffset) / anglePerDot + totalDots) % totalDots
  );
  const middleCenterIndex = Math.round(
    ((Math.PI / 2 - middleAngleOffset) / anglePerDot + totalDots) % totalDots
  );
  const rightCenterIndex = Math.round(
    ((Math.PI / 2 - rightAngleOffset) / anglePerDot + totalDots) % totalDots
  );
  const secondRightCenterIndex = Math.round(
    ((Math.PI / 2 - secondRightAngleOffset) / anglePerDot + totalDots) %
      totalDots
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="relative h-full w-[432px] rounded-r-full border-2"
        ref={leftCircleRef}
        onMouseDown={handleMouseDownLeft}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute h-[500px] w-[250px] rounded-r-full border-2 top-32"></div>

        {/* Conditionally render the middle circle based on state */}
        {showMiddleCircle && (
          <div className="absolute h-[300px] w-[150px] rounded-r-full bg-blue-300 shadow-md top-[232px]"></div>
        )}

        {leftDots.map((dot) => (
          <div
            key={dot.index}
            className="absolute flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y + 346}px`,
              userSelect: "none",
            }}
            onMouseDown={() => {
              setIsDraggingLeft(true);
              setLastMouseYLeft(null);
            }}
            onClick={() => handleDotClickLeft(dot.index)}
          >
            <div
              className={`flex gap-4 flex-row ${
                dot.index === leftCenterIndex
                  ? "border-blue-500"
                  : "border-black"
              }`}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                  dot.index === leftCenterIndex ? "border-blue-500" : ""
                }`}
              >
                {dot.index + 1}
              </div>
              <div className="text-sm mt-2">{industryNames[dot.index]}</div>
            </div>
          </div>
        ))}

        {/* Conditionally render the middle circle's dots */}
        {showMiddleCircle &&
          middleDots.map((dot) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                left: `${dot.x}px`,
                top: `${dot.y + 350}px`,
                userSelect: "none",
              }}
              onMouseDown={handleMouseDownMiddle}
              onClick={() => handleDotClickMiddle(dot.index)}
            >
              <div
                className={`flex gap-4 flex-row ${
                  dot.index === middleCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === middleCenterIndex ? "border-blue-500" : ""
                  }`}
                >
                  {dot.index + 1}
                </div>
                <div className="text-sm mt-2">
                  {middleIndustryNames[dot.index]}
                </div>
              </div>
            </div>
          ))}
      </div>

      {openVerticalLine && (
        <div className="flex-1 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>

          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: `${(index / 8) * 100}%`,
                marginTop: "84px",
              }}
              onClick={handleVerticalDotClick}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}

      {rightSemicircleOpen && !useSecondRightSemicircle && (
        <div
          className="relative h-full w-[375px] rounded-l-full border-2"
          ref={rightCircleRef}
          onMouseDown={handleMouseDownRight}
          onClick={(event) => {
            handleRightSemicircleClick();
            event.stopPropagation();
          }}
        >
          <div className="absolute h-[500px] w-[250px] rounded-l-full bg-blue-100 shadow-md top-32 right-0"></div>
          {rightDots.map((dot) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                right: `${dot.x}px`,
                top: `${dot.y + 356}px`,
                userSelect: "none",
              }}
              onMouseDown={() => {
                setIsDraggingRight(true);
                setLastMouseYRight(null);
              }}
              onClick={() => handleDotClickRight(dot.index)}
            >
              <div
                className={`flex gap-4 flex-row-reverse ${
                  dot.index === rightCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === rightCenterIndex ? "border-blue-500" : ""
                  }`}
                >
                  {dot.index + 1}
                </div>
                <div className="text-sm mt-2">
                  {firstRightIndustryNames[dot.index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {useSecondRightSemicircle && (
        <div
          className="relative h-full w-[375px] rounded-l-full border-2"
          ref={secondRightCircleRef}
          onMouseDown={handleMouseDownSecondRight}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute h-[500px] w-[250px] rounded-l-full bg-blue-100 shadow-md top-32 right-0"></div>
          {secondRightDots.map((dot) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                right: `${dot.x}px`,
                top: `${dot.y + 356}px`,
                userSelect: "none",
              }}
              onMouseDown={() => {
                setIsDraggingSecondRight(true);
                setLastMouseYSecondRight(null);
              }}
              onClick={() => handleDotClickSecondRight(dot.index)}
            >
              <div
                className={`flex gap-4 flex-row-reverse ${
                  dot.index === secondRightCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === secondRightCenterIndex
                      ? "border-blue-500"
                      : ""
                  }`}
                >
                  {dot.index + 1}
                </div>
                <div className="text-sm mt-2">
                  {secondRightIndustryNames[dot.index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

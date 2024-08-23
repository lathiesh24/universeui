import React, { useState, useEffect, useRef } from "react";
import sectorData from "./data/sector_data.json"; // Assuming the JSON file is stored here

const App = () => {
  const sectors = sectorData.sectors;

  const getSectorData = (path) => {
    return sectors.flatMap((sector) =>
      path === "industries"
        ? sector.industries?.map((industry) => ({
            sectorName: sector.sectorName,
            industryName: industry.industryName,
          })) || []
        : path === "technologies"
        ? sector.industries?.flatMap(
            (industry) =>
              industry.technologies?.map((tech) => ({
                sectorName: sector.sectorName,
                industryName: industry.industryName,
                technologyName: tech.technologyName,
              })) || []
          ) || []
        : path === "use_cases"
        ? sector.industries?.flatMap(
            (industry) =>
              industry.technologies?.flatMap(
                (tech) =>
                  tech.useCases?.map((useCase) => ({
                    sectorName: sector.sectorName,
                    industryName: industry.industryName,
                    technologyName: tech.technologyName,
                    useCaseTitle: useCase.useCaseTitle,
                  })) || []
              ) || []
          ) || []
        : sector.name
    );
  };

  const [leftOuterCircleData, setLeftOuterCircleData] = useState(
    getSectorData("industries")
  );

  const [firstRightCircleData, setFirstRightCircleData] = useState(
    getSectorData("technologies")
  );
  const [innerLeftCircleData, setInnerLeftCircleData] = useState([]);
  const verticalDotsData = getSectorData("use_cases");
  const secondRightCircleData = sectors.flatMap((sector) =>
    sector.industries?.flatMap((industry) =>
      industry.technologies?.flatMap((tech) =>
        tech.useCases?.flatMap((useCase) =>
          useCase.associatedStartups.map((startup) => ({
            sectorName: sector.sectorName,
            industryName: industry.industryName,
            technologyName: tech.technologyName,
            useCaseTitle: useCase.useCaseTitle,
            startupName: startup,
          }))
        )
      )
    )
  );

  const totalLeftDots = leftOuterCircleData.length;
  const totalMiddleDots = innerLeftCircleData.length;
  const totalRightDots = firstRightCircleData.length;
  const totalSecondRightDots = secondRightCircleData.length;

  const anglePerDotLeft = (2 * Math.PI) / totalLeftDots;
  const anglePerDotMiddle = (2 * Math.PI) / totalMiddleDots;
  const anglePerDotRight = (2 * Math.PI) / totalRightDots;
  const anglePerDotSecondRight = (2 * Math.PI) / totalSecondRightDots;

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
  const [rightSemicircleOpen, setRightSemicircleOpen] = useState(false);
  const [useSecondRightSemicircle, setUseSecondRightSemicircle] =
    useState(false);
  const [showMiddleCircle, setShowMiddleCircle] = useState(false);
  const [interactionStage, setInteractionStage] = useState("left");

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
    if (interactionStage === "left") {
      handleDotClick(
        dotIndex,
        setLeftAngleOffset,
        leftAngleOffset,
        totalLeftDots
      );
      if (!rightSemicircleOpen) {
        // Open the right semicircle on the first click
        setRightSemicircleOpen(true);
        setInteractionStage("right");
      } else if (interactionStage === "right") {
        // Open the vertical line for use cases after data swap
        setOpenVerticalLine(true);
        setInteractionStage("vertical");
      }
    } else if (interactionStage === "vertical") {
      handleDotClick(
        dotIndex,
        setLeftAngleOffset,
        leftAngleOffset,
        totalLeftDots
      );
    }
  };

  const handleDotClickMiddle = (dotIndex) => {
    handleDotClick(
      dotIndex,
      setMiddleAngleOffset,
      middleAngleOffset,
      totalMiddleDots
    );
  };

  const handleVerticalDotClick = () => {
    setUseSecondRightSemicircle(true);
  };

  const handleDotClickRight = (dotIndex) => {
    if (interactionStage === "right") {
      handleDotClick(
        dotIndex,
        setRightAngleOffset,
        rightAngleOffset,
        totalRightDots
      );

      // Move the entire right semicircle data to the left outer semicircle
      setLeftOuterCircleData(firstRightCircleData);

      // Move the current left outer circle data to the left inner circle
      setInnerLeftCircleData(leftOuterCircleData);

      // Hide the right semicircle
      setRightSemicircleOpen(false);

      // Show the inner left semicircle
      setShowMiddleCircle(true);

      // Update the interaction stage to "vertical" to handle opening vertical dots
      setInteractionStage("vertical");
    }
  };

  const handleDotClickSecondRight = (dotIndex) => {
    handleDotClick(
      dotIndex,
      setSecondRightAngleOffset,
      secondRightAngleOffset,
      totalSecondRightDots
    );
  };

  const handleDotClick = (dotIndex, setAngleOffset, angleOffset, totalDots) => {
    const normalizedAngleOffset =
      ((angleOffset % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const currentCenterIndex = Math.round(
      ((Math.PI / 2 - normalizedAngleOffset) / anglePerDotLeft + totalDots) %
        totalDots
    );

    const distance = (dotIndex - currentCenterIndex + totalDots) % totalDots;
    const shortestDistance =
      distance <= totalDots / 2 ? distance : distance - totalDots;
    const angleDifference = shortestDistance * anglePerDotLeft;
    setAngleOffset((prevOffset) => prevOffset - angleDifference);
  };

  const radiusX = 410;
  const radiusY = 378;

  const leftDots = Array.from({ length: totalLeftDots }).map((_, index) => {
    const angle = (index / totalLeftDots) * Math.PI * 2 + leftAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const middleRadiusX = 230;
  const middleRadiusY = 248;
  const middleDots = Array.from({ length: totalMiddleDots }).map((_, index) => {
    const angle = (index / totalMiddleDots) * Math.PI * 2 + middleAngleOffset;
    const x = middleRadiusX * Math.sin(angle);
    const y = middleRadiusY * Math.cos(angle);
    return { x, y, index };
  });

  const rightDots = Array.from({ length: totalRightDots }).map((_, index) => {
    const angle = (index / totalRightDots) * Math.PI * 2 + rightAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const secondRightDots = Array.from({ length: totalSecondRightDots }).map(
    (_, index) => {
      const angle =
        (index / totalSecondRightDots) * Math.PI * 2 + secondRightAngleOffset;
      const x = radiusX * Math.sin(angle);
      const y = radiusY * Math.cos(angle);
      return { x, y, index };
    }
  );

  const leftCenterIndex = Math.round(
    ((Math.PI / 2 - leftAngleOffset) / anglePerDotLeft + totalLeftDots) %
      totalLeftDots
  );
  const middleCenterIndex = Math.round(
    ((Math.PI / 2 - middleAngleOffset) / anglePerDotMiddle + totalMiddleDots) %
      totalMiddleDots
  );
  const rightCenterIndex = Math.round(
    ((Math.PI / 2 - rightAngleOffset) / anglePerDotRight + totalRightDots) %
      totalRightDots
  );
  const secondRightCenterIndex = Math.round(
    ((Math.PI / 2 - secondRightAngleOffset) / anglePerDotSecondRight +
      totalSecondRightDots) %
      totalSecondRightDots
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Circle */}
      <div
        className="fixed top-0 left-0 h-full w-[432px] rounded-r-full border-2"
        ref={leftCircleRef}
        onMouseDown={handleMouseDownLeft}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute h-[500px] w-[250px] rounded-r-full border-2 top-32"></div>

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
              className={`flex flex-row items-center justify-center ${
                dot.index === leftCenterIndex
                  ? "border-blue-500"
                  : "border-black"
              }`}
              style={{
                textAlign: "center", // Center text below the circle
              }}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                  dot.index === leftCenterIndex ? "border-blue-500" : ""
                }`}
                style={{
                  flexShrink: 0, // Prevent shrinking due to text
                  width: "40px", // Maintain the width
                  height: "40px", // Maintain the height
                }}
              >
                {dot.index + 1}
              </div>
              <div
                className="text-sm w-32"
                style={{
                  wordWrap: "break-word", // Allow the text to wrap to the next line
                  whiteSpace: "normal", // Ensure text wraps properly
                }}
              >
                {leftOuterCircleData[dot.index].technologyName
                  ? leftOuterCircleData[dot.index].technologyName
                  : leftOuterCircleData[dot.index].industryName || "N/A"}
              </div>
            </div>
          </div>
        ))}

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
                className={`flex flex-col items-center justify-center ${
                  dot.index === middleCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
                style={{
                  textAlign: "center", // Center text below the circle
                }}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === middleCenterIndex ? "border-blue-500" : ""
                  }`}
                  style={{
                    flexShrink: 0, // Prevent shrinking due to text
                    width: "40px", // Maintain the width
                    height: "40px", // Maintain the height
                  }}
                >
                  {dot.index + 1}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{
                    maxWidth: "100px", // Control the width of the text container
                    wordWrap: "break-word", // Allow the text to wrap to the next line
                    whiteSpace: "normal", // Ensure text wraps properly
                  }}
                >
                  {innerLeftCircleData[dot.index].industryName || "N/A"}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Vertical Line */}
      {openVerticalLine && (
        <div className="flex-1 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>

          {verticalDotsData.map((data, index) => (
            <div
              key={index}
              className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: `${(index / verticalDotsData.length) * 100}%`,
                marginTop: "84px",
              }}
              onClick={handleVerticalDotClick}
            >
              <div
                className="text-xs"
                style={{
                  textAlign: "center",
                }}
              >
                {data.useCaseTitle || "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Right Circle */}
      {rightSemicircleOpen && !useSecondRightSemicircle && (
        <div
          className="fixed top-0 right-0 h-full w-[375px] rounded-l-full border-2"
          ref={rightCircleRef}
          onMouseDown={handleMouseDownRight}
          onClick={(event) => {
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
                className={`flex flex-col items-center justify-center ${
                  dot.index === rightCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
                style={{
                  textAlign: "center", // Center text below the circle
                }}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === rightCenterIndex ? "border-blue-500" : ""
                  }`}
                  style={{
                    flexShrink: 0, // Prevent shrinking due to text
                    width: "40px", // Maintain the width
                    height: "40px", // Maintain the height
                  }}
                >
                  {dot.index + 1}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{
                    maxWidth: "100px", // Control the width of the text container
                    wordWrap: "break-word", // Allow the text to wrap to the next line
                    whiteSpace: "normal", // Ensure text wraps properly
                  }}
                >
                  {firstRightCircleData[dot.index].technologyName || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Second Right Circle */}
      {useSecondRightSemicircle && (
        <div
          className="fixed top-0 right-0 h-full w-[375px] rounded-l-full border-2"
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
                className={`flex flex-col items-center justify-center ${
                  dot.index === secondRightCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
                style={{
                  textAlign: "center", // Center text below the circle
                }}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === secondRightCenterIndex
                      ? "border-blue-500"
                      : ""
                  }`}
                  style={{
                    flexShrink: 0, // Prevent shrinking due to text
                    width: "40px", // Maintain the width
                    height: "40px", // Maintain the height
                  }}
                >
                  {dot.index + 1}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{
                    maxWidth: "100px", // Control the width of the text container
                    wordWrap: "break-word", // Allow the text to wrap to the next line
                    whiteSpace: "normal", // Ensure text wraps properly
                  }}
                >
                  {secondRightCircleData[dot.index].startupName || "N/A"}
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

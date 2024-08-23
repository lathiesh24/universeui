import React, { useState, useEffect, useRef } from "react";
import sectorData from "./data/sector_data.json"; // Assuming the JSON file is stored here

const App = () => {
  const sectors = sectorData.sectors;

  const getSectorData = (path) => {
    return sectors.flatMap(
      (sector) =>
        sector.industries?.flatMap(
          (industry) =>
            industry.technologies?.flatMap((tech) =>
              path === "use_cases"
                ? tech.technologyName === "Generative AI" ||
                  tech.technologyName === "Next-Generation Software Development"
                  ? tech.useCases?.map((useCase) => ({
                      sectorName: sector.sectorName,
                      industryName: industry.industryName,
                      technologyName: tech.technologyName,
                      useCaseTitle: useCase.useCaseTitle,
                      useCaseDescription: useCase.useCaseDescription,
                      referenceSource: useCase.referenceSource,
                      associatedStartups: useCase.associatedStartups,
                    })) || []
                  : []
                : []
            ) || []
        ) || []
    );
  };

  const [leftOuterCircleData1, setLeftOuterCircleData1] = useState(
    getSectorData("industries")
  );
  const [leftOuterCircleData2, setLeftOuterCircleData2] = useState([]);
  const [innerLeftCircleData, setInnerLeftCircleData] = useState([]);
  const [firstRightCircleData, setFirstRightCircleData] = useState(
    getSectorData("technologies")
  );
  const [verticalDotsData, setVerticalDotsData] = useState(
    getSectorData("use_cases")
  );
  const secondRightCircleData = [
    {
      companyName: "Zest AI",
      description:
        "Specializes in using machine learning to improve credit underwriting models, helping insurers predict risks more accurately.",
    },
    {
      companyName: "Lapetus Solutions",
      description:
        "Offers facial analytics and biometric solutions to enhance life insurance underwriting processes.",
    },
    {
      companyName: "UnderwriteMe",
      description:
        "Provides a rules engine that uses data and analytics to streamline and predict underwriting decisions.",
    },
    {
      companyName: "Akur8",
      description:
        "Uses AI to automate insurance pricing and underwriting, improving speed and accuracy.",
    },
    {
      companyName: "Flyreel",
      description:
        "Utilizes AI to assess property conditions and risks for underwriting, enhancing predictive accuracy.",
    },
  ];

  const totalLeftDots1 = leftOuterCircleData1.length;
  const totalLeftDots2 = leftOuterCircleData2.length;
  const totalMiddleDots = innerLeftCircleData.length;
  const totalRightDots = firstRightCircleData.length;
  const totalSecondRightDots = secondRightCircleData.length;

  const anglePerDotLeft1 = (2 * Math.PI) / totalLeftDots1;
  const anglePerDotLeft2 = (2 * Math.PI) / totalLeftDots2;
  const anglePerDotMiddle = (2 * Math.PI) / totalMiddleDots;
  const anglePerDotRight = (2 * Math.PI) / totalRightDots;
  const anglePerDotSecondRight = (2 * Math.PI) / totalSecondRightDots;

  const [leftAngleOffset1, setLeftAngleOffset1] = useState(Math.PI / 2);
  const [leftAngleOffset2, setLeftAngleOffset2] = useState(Math.PI / 2);
  const [middleAngleOffset, setMiddleAngleOffset] = useState(Math.PI / 2);
  const [rightAngleOffset, setRightAngleOffset] = useState(Math.PI / 2);
  const [secondRightAngleOffset, setSecondRightAngleOffset] = useState(
    Math.PI / 2
  );
  const [isDraggingLeft1, setIsDraggingLeft1] = useState(false);
  const [isDraggingLeft2, setIsDraggingLeft2] = useState(false);
  const [isDraggingMiddle, setIsDraggingMiddle] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isDraggingSecondRight, setIsDraggingSecondRight] = useState(false);
  const [lastMouseYLeft1, setLastMouseYLeft1] = useState(null);
  const [lastMouseYLeft2, setLastMouseYLeft2] = useState(null);
  const [lastMouseYMiddle, setLastMouseYMiddle] = useState(null);
  const [lastMouseYRight, setLastMouseYRight] = useState(null);
  const [lastMouseYSecondRight, setLastMouseYSecondRight] = useState(null);
  const [openVerticalLine, setOpenVerticalLine] = useState(false);
  const [rightSemicircleOpen, setRightSemicircleOpen] = useState(false);
  const [useSecondRightSemicircle, setUseSecondRightSemicircle] =
    useState(false);
  const [showMiddleCircle, setShowMiddleCircle] = useState(false);
  const [interactionStage, setInteractionStage] = useState("left1");

  const leftCircleRef1 = useRef(null);
  const leftCircleRef2 = useRef(null);
  const middleCircleRef = useRef(null);
  const rightCircleRef = useRef(null);
  const secondRightCircleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingLeft1) {
        handleMouseMoveLeft1(event);
      }
      if (isDraggingLeft2) {
        handleMouseMoveLeft2(event);
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
    isDraggingLeft1,
    lastMouseYLeft1,
    isDraggingLeft2,
    lastMouseYLeft2,
    isDraggingMiddle,
    lastMouseYMiddle,
    isDraggingRight,
    lastMouseYRight,
    isDraggingSecondRight,
    lastMouseYSecondRight,
  ]);

  const handleMouseMoveLeft1 = (event) => {
    if (isDraggingLeft1) {
      const { clientY } = event;
      if (lastMouseYLeft1 !== null) {
        const deltaY = clientY - lastMouseYLeft1;
        const rotationSpeed = 0.005;
        setLeftAngleOffset1(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYLeft1(clientY);
    }
  };

  const handleMouseMoveLeft2 = (event) => {
    if (isDraggingLeft2) {
      const { clientY } = event;
      if (lastMouseYLeft2 !== null) {
        const deltaY = clientY - lastMouseYLeft2;
        const rotationSpeed = 0.005;
        setLeftAngleOffset2(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYLeft2(clientY);
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
    setIsDraggingLeft1(false);
    setIsDraggingLeft2(false);
    setIsDraggingMiddle(false);
    setIsDraggingRight(false);
    setIsDraggingSecondRight(false);
    setLastMouseYLeft1(null);
    setLastMouseYLeft2(null);
    setLastMouseYMiddle(null);
    setLastMouseYRight(null);
    setLastMouseYSecondRight(null);
  };

  const handleMouseDownLeft1 = (event) => {
    if (
      leftCircleRef1.current &&
      leftCircleRef1.current.contains(event.target)
    ) {
      setIsDraggingLeft1(true);
      setLastMouseYLeft1(event.clientY);
    }
  };

  const handleMouseDownLeft2 = (event) => {
    if (
      leftCircleRef2.current &&
      leftCircleRef2.current.contains(event.target)
    ) {
      setIsDraggingLeft2(true);
      setLastMouseYLeft2(event.clientY);
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

  const handleDotClickLeft1 = (dotIndex) => {
    if (interactionStage === "left1") {
      handleDotClick(
        dotIndex,
        setLeftAngleOffset1,
        leftAngleOffset1,
        totalLeftDots1
      );
      if (!rightSemicircleOpen) {
        setRightSemicircleOpen(true);
      }
    }
  };

  const handleDotClickLeft2 = (dotIndex) => {
    if (interactionStage === "left2") {
      handleDotClick(
        dotIndex,
        setLeftAngleOffset2,
        leftAngleOffset2,
        totalLeftDots2
      );
      setOpenVerticalLine(true); // Open vertical line
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
    setUseSecondRightSemicircle(true); // Show second right semicircle
  };

  const handleDotClickRight = (dotIndex) => {
    if (interactionStage === "left1") {
      handleDotClick(
        dotIndex,
        setRightAngleOffset,
        rightAngleOffset,
        totalRightDots
      );

      setLeftOuterCircleData2(firstRightCircleData); // Move right semicircle data to second left outer semicircle
      setInnerLeftCircleData(leftOuterCircleData1); // Move first left outer circle data to inner left circle
      setInteractionStage("left2"); // Transition to the second left outer circle

      setRightSemicircleOpen(false); // Hide the right semicircle
      setLeftOuterCircleData1([]); // Hide the first left outer circle

      setShowMiddleCircle(true); // Show the inner left semicircle
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
      ((Math.PI / 2 - normalizedAngleOffset) / anglePerDotLeft1 + totalDots) %
        totalDots
    );

    const distance = (dotIndex - currentCenterIndex + totalDots) % totalDots;
    const shortestDistance =
      distance <= totalDots / 2 ? distance : distance - totalDots;
    const angleDifference = shortestDistance * anglePerDotLeft1;
    setAngleOffset((prevOffset) => prevOffset - angleDifference);
  };

  const radiusX = 410;
  const radiusY = 378;

  const leftDots1 = Array.from({ length: totalLeftDots1 }).map((_, index) => {
    const angle = (index / totalLeftDots1) * Math.PI * 2 + leftAngleOffset1;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const leftDots2 = Array.from({ length: totalLeftDots2 }).map((_, index) => {
    const angle = (index / totalLeftDots2) * Math.PI * 2 + leftAngleOffset2;
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

  const leftCenterIndex1 = Math.round(
    ((Math.PI / 2 - leftAngleOffset1) / anglePerDotLeft1 + totalLeftDots1) %
      totalLeftDots1
  );
  const leftCenterIndex2 = Math.round(
    ((Math.PI / 2 - leftAngleOffset2) / anglePerDotLeft2 + totalLeftDots2) %
      totalLeftDots2
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
      {/* First Left Circle */}
      <div
        className={`fixed top-0 left-0 h-full w-[432px] rounded-r-full border-2 ${
          interactionStage !== "left2" ? "block" : "hidden"
        }`}
        ref={leftCircleRef1}
        onMouseDown={handleMouseDownLeft1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute h-[500px] w-[250px] rounded-r-full border-2 top-32"></div>

        {leftDots1.map((dot) => (
          <div
            key={dot.index}
            className="absolute flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y + 346}px`,
              userSelect: "none",
            }}
            onMouseDown={() => {
              setIsDraggingLeft1(true);
              setLastMouseYLeft1(null);
            }}
            onClick={() => handleDotClickLeft1(dot.index)}
          >
            <div
              className={`flex flex-row items-center justify-center ${
                dot.index === leftCenterIndex1
                  ? "border-blue-500"
                  : "border-black"
              }`}
              style={{
                textAlign: "center",
              }}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                  dot.index === leftCenterIndex1 ? "border-blue-500" : ""
                }`}
                style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                }}
              >
                {dot.index + 1}
              </div>
              <div
                className="text-sm w-32"
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {leftOuterCircleData1[dot.index].industryName || "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Left Circle */}
      {interactionStage === "left2" && (
        <div
          className="fixed top-0 left-0 h-full w-[432px] rounded-r-full border-2"
          ref={leftCircleRef2}
          onMouseDown={handleMouseDownLeft2}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute h-[500px] w-[250px] rounded-r-full border-2 top-32"></div>

          {leftDots2.map((dot) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                left: `${dot.x}px`,
                top: `${dot.y + 346}px`,
                userSelect: "none",
              }}
              onMouseDown={() => {
                setIsDraggingLeft2(true);
                setLastMouseYLeft2(null);
              }}
              onClick={() => handleDotClickLeft2(dot.index)}
            >
              <div
                className={`flex flex-row items-center justify-center ${
                  dot.index === leftCenterIndex2
                    ? "border-blue-500"
                    : "border-black"
                }`}
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === leftCenterIndex2 ? "border-blue-500" : ""
                  }`}
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {dot.index + 1}
                </div>
                <div
                  className="text-sm w-32"
                  style={{
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {leftOuterCircleData2[dot.index].technologyName || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Middle Circle */}
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
                textAlign: "center",
              }}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                  dot.index === middleCenterIndex ? "border-blue-500" : ""
                }`}
                style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                }}
              >
                {dot.index + 1}
              </div>
              <div
                className="text-sm mt-1"
                style={{
                  maxWidth: "100px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {innerLeftCircleData[dot.index].industryName || "N/A"}
              </div>
            </div>
          </div>
        ))}

      {/* Vertical Line */}
      {openVerticalLine && (
        <div className="flex-1 relative">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 transform -translate-x-1/2"></div>

          {verticalDotsData.map((data, index) => (
            <div
              key={index}
              className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: `${(index / verticalDotsData.length) * 60 + 5}%`, // Adjust the top position
                marginTop: "10px", // Ensure the dots are closer to the top
              }}
              onClick={handleVerticalDotClick}
            >
              <div
                className="text-xs absolute left-full ml-4" // Position text beside the dot
                style={{
                  textAlign: "left",
                  whiteSpace: "nowrap",
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
                  textAlign: "center",
                }}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === rightCenterIndex ? "border-blue-500" : ""
                  }`}
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {dot.index + 1}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{
                    maxWidth: "100px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
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
                className={`flex flex-row gap-4 items-center justify-center ${
                  dot.index === secondRightCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  className="text-sm mt-1"
                  style={{
                    maxWidth: "100px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {secondRightCircleData[dot.index].companyName || "N/A"}
                </div>
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === secondRightCenterIndex
                      ? "border-blue-500"
                      : ""
                  }`}
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {dot.index + 1}
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

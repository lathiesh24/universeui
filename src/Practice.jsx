import React, { useState, useRef, useEffect } from "react";

const trends = [
  "Artificial Intelligence (AI)",
  "Blockchain Technology",
  "Quantum Computing",
  "5G Networks",
  "Internet of Things (IoT)",
  "Augmented Reality (AR) & Virtual Reality (VR)",
  "Cybersecurity Advances",
  "Edge Computing",
  "Autonomous Vehicles",
  "Renewable Energy Technologies",
];

const industryNames = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Automotive",
  "Energy",
  "Hospitality",
  "Agriculture",
  "Construction",
];

const bottomIndustryNames = [
  "Logistics",
  "Real Estate",
  "Tourism",
  "Manufacturing",
  "Media",
  "Telecommunications",
  "Entertainment",
  "Transportation",
  "Aerospace",
  "Pharmaceuticals",
];

const alternateBottomIndustryNames = [
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
];

const InnerIndustryName = [
  "Mobile Services",
  "Telecom Services",
  "Education Services",
  "Mobile Services",
  "Telecom Services",
  "Education Services",
  "Mobile Services",
  "Telecom Services",
  "Education Services",
];

const CombinedComponent = () => {
  const totalPositions = 8;
  const totalDots = 8;
  const totalInnerDots = 8;
  const radiusX = 190;
  const radiusY = 198;
  const radiusInnerX = 100;
  const radiusInnerY = 100;
  const anglePerDot = (2 * Math.PI) / totalDots;

  const [leftAngleOffset, setLeftAngleOffset] = useState(0); // Start with 1 at the bottom center
  const [leftInnerAngleOffset, setLeftInnerAngleOffset] = useState(0);
  const [rightAngleOffset, setRightAngleOffset] = useState(Math.PI); // Start with 1 at the top center
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isDraggingLeftInner, setIsDraggingLeftInner] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(null);
  const [lastTouchXRight, setLastTouchXRight] = useState(null);
  const [lastTouchXLeftInner, setLastTouchXLeftInner] = useState(null);

  const [horizontalLineVisible, setHorizontalLineVisible] = useState(false);
  const [bottomCircleVisible, setBottomCircleVisible] = useState(false);
  const [innerTopCircleVisible, setInnerTopCircleVisible] = useState(false);
  const [alternateBottom, setAlternateBottom] = useState(false);

  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollLeft = 0;
    }

    if (container.scrollLeft <= 0) {
      container.scrollLeft = container.scrollWidth - container.clientWidth;
    }
  };

  const handleTouchMove = (event) => {
    if (isDragging && !isDraggingLeftInner) {
      const touch = event.touches[0];
      if (lastTouchX !== null) {
        const deltaX = touch.clientX - lastTouchX;
        const rotationSpeed = 0.0005;
        setLeftAngleOffset((prevOffset) => prevOffset + deltaX * rotationSpeed);
      }
      setLastTouchX(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchX(null);
  };

  const handleTouchStart = (event) => {
    if (!isDraggingLeftInner) {
      setIsDragging(true);
      setLastTouchX(event.touches[0].clientX);
    }
  };

  const handleTouchMoveRight = (event) => {
    if (isDraggingRight && !isDraggingLeftInner) {
      const touch = event.touches[0];
      if (lastTouchXRight !== null) {
        const deltaX = touch.clientX - lastTouchXRight;
        const rotationSpeed = 0.0005;
        setRightAngleOffset(
          (prevOffset) => prevOffset + deltaX * rotationSpeed
        );
      }
      setLastTouchXRight(touch.clientX);
    }
  };

  const handleTouchEndRight = () => {
    setIsDraggingRight(false);
    setLastTouchXRight(null);
  };

  const handleTouchStartRight = (event) => {
    if (!isDraggingLeftInner) {
      setIsDraggingRight(true);
      setLastTouchXRight(event.touches[0].clientX);
    }
  };

  const handleTouchMoveInner = (event) => {
    if (isDraggingLeftInner) {
      const touch = event.touches[0];
      if (lastTouchXLeftInner !== null) {
        const deltaX = touch.clientX - lastTouchXLeftInner;
        const rotationSpeed = 0.0002;
        setLeftInnerAngleOffset(
          (prevOffset) => prevOffset + deltaX * rotationSpeed
        );
      }
      setLastTouchXLeftInner(touch.clientX);
    }
  };

  const handleTouchEndInner = () => {
    setIsDraggingLeftInner(false);
    setLastTouchXLeftInner(null);
  };

  const handleTouchStartInner = (event) => {
    setIsDraggingLeftInner(true);
    setLastTouchXLeftInner(event.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    if (isDraggingRight) {
      window.addEventListener("touchmove", handleTouchMoveRight);
      window.addEventListener("touchend", handleTouchEndRight);
    } else {
      window.removeEventListener("touchmove", handleTouchMoveRight);
      window.removeEventListener("touchend", handleTouchEndRight);
    }
    return () => {
      window.removeEventListener("touchmove", handleTouchMoveRight);
      window.removeEventListener("touchend", handleTouchEndRight);
    };
  }, [isDraggingRight]);

  useEffect(() => {
    if (isDraggingLeftInner) {
      window.addEventListener("touchmove", handleTouchMoveInner);
      window.addEventListener("touchend", handleTouchEndInner);
    } else {
      window.removeEventListener("touchmove", handleTouchMoveInner);
      window.removeEventListener("touchend", handleTouchEndInner);
    }
  }, [isDraggingLeftInner]);

  const calculateCenterIndex = (angleOffset) => {
    const normalizedAngleOffset = angleOffset % (2 * Math.PI);
    const centerIndex = Math.round(
      ((normalizedAngleOffset + Math.PI / 2) / anglePerDot + totalDots) %
        totalDots
    );
    return centerIndex;
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

  const visibleDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalPositions) * Math.PI * 2 + leftAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const visibleDotsRight = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalPositions) * Math.PI * 2 + rightAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = -radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const visibleInnerDots = Array.from({ length: totalInnerDots }).map(
    (_, index) => {
      const angle =
        (index / totalPositions) * Math.PI * 2 + leftInnerAngleOffset;
      const x = radiusInnerX * Math.sin(angle);
      const y = radiusInnerY * Math.cos(angle);
      return { x, y, index };
    }
  );

  const leftCenterIndex = calculateCenterIndex(leftAngleOffset);
  const rightCenterIndex = calculateCenterIndex(rightAngleOffset);
  const leftInnerCenterIndex = calculateCenterIndex(leftInnerAngleOffset);

  const handleOuterCircleClick = () => {
    if (leftCenterIndex === 0) {
      setHorizontalLineVisible(true);
    }
  };

  const handleHorizontalLineDotClick = () => {
    setBottomCircleVisible(true);
  };

  const handleBottomCircleClick = () => {
    if (rightCenterIndex === 0) {
      setInnerTopCircleVisible(true);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col justify-center">
      {/* Semicircle Component (Top Outer Circle) */}
      <div
        ref={outerRef}
        className="absolute top-0 left-0 right-0 h-[200px] rounded-b-full border-2 cursor-pointer"
        onTouchStart={handleTouchStart}
        onClick={handleOuterCircleClick}
      >
        {visibleDots.slice(0, totalPositions).map((dot) => (
          <div
            key={dot.index}
            className="absolute"
            style={{
              left: `${dot.x + 180}px`,
              top: `${dot.y - 16}px`,
              userSelect: "none",
            }}
            onClick={() =>
              handleDotClick(dot.index, setLeftAngleOffset, leftAngleOffset)
            }
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
              <div className="text-sm mt-2">
                {industryNames[dot.index % totalDots]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Scrolling Component */}
      {horizontalLineVisible && (
        <div className="relative my-8">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full flex overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide"
            style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
          >
            {[...Array(10)].map((_, i) =>
              trends.map((item, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex-shrink-0 mx-12 w-10 h-10 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full cursor-pointer"
                  onClick={handleHorizontalLineDotClick}
                >
                  {index + 1}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Semicircle Component (Bottom Circle) */}
      {bottomCircleVisible && (
        <div
          className="absolute bottom-0 right-0 left-0 w-full h-[200px] rounded-t-full border-2 cursor-pointer"
          onTouchStart={handleTouchStartRight}
          onClick={handleBottomCircleClick}
        >
          {visibleDotsRight.slice(0, totalPositions).map((dot) => (
            <div
              key={dot.index}
              className="absolute"
              style={{
                left: `${dot.x + 180}px`,
                bottom: `${dot.y + 0}px`,
                userSelect: "none",
              }}
              onClick={() =>
                handleDotClick(dot.index, setRightAngleOffset, rightAngleOffset)
              }
            >
              <div
                className={`flex gap-4 flex-row ${
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
                  {alternateBottom
                    ? alternateBottomIndustryNames[dot.index % totalDots]
                    : bottomIndustryNames[dot.index % totalDots]}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Semicircle Component (Inner Top Circle) */}
      {innerTopCircleVisible && (
        <div
          ref={innerRef}
          className="absolute top-0 left-0 right-0 h-[100px] rounded-b-full border-2 cursor-pointer"
          onTouchStart={handleTouchStartInner}
        >
          {visibleInnerDots.slice(0, totalPositions).map((dot) => (
            <div
              key={dot.index}
              className="absolute"
              style={{
                left: `${dot.x + 180}px`,
                top: `${dot.y - 16}px`,
                userSelect: "none",
              }}
              onClick={() =>
                handleDotClick(
                  dot.index,
                  setLeftInnerAngleOffset,
                  leftInnerAngleOffset
                )
              }
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-6 h-6 flex items-center justify-center ${
                  dot.index === leftInnerCenterIndex ? "border-red-500" : ""
                }`}
              >
                {dot.index + 1}
              </div>
              <div className="text-xs mt-1">
                {InnerIndustryName[dot.index % totalInnerDots]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CombinedComponent;

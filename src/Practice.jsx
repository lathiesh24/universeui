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
  // Semicircle State and Logic
  const totalPositions = 8;
  const totalDots = 8;
  const totalInnerDots = 8;
  const radiusX = 190;
  const radiusY = 198;
  const radiusInnerX = 100;
  const radiusInnerY = 100;

  const [leftAngleOffset, setLeftAngleOffset] = useState(Math.PI / 2);
  const [leftInnerAngleOffset, setLeftInnerAngleOffset] = useState(Math.PI / 2);
  const [rightAngleOffset, setRightAngleOffset] = useState(-Math.PI / 2);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isDraggingLeftInner, setIsDraggingLeftInner] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(null);
  const [lastTouchXRight, setLastTouchXRight] = useState(null);
  const [lastTouchXLeftInner, setLastTouchXLeftInner] = useState(null);

  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // Infinite Scroll State and Logic
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;

    // Scroll to the start if the user scrolls past the end
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollLeft = 0;
    }

    // Scroll to the end if the user scrolls to the start
    if (container.scrollLeft <= 0) {
      container.scrollLeft = container.scrollWidth - container.clientWidth;
    }
  };

  // Function to handle touch movement for rotation (outer circle)
  const handleTouchMove = (event) => {
    if (isDragging && !isDraggingLeftInner) {
      const touch = event.touches[0];
      if (lastTouchX !== null) {
        const deltaX = touch.clientX - lastTouchX;
        const rotationSpeed = 0.0005; // Adjust the rotation speed to make it slower
        setLeftAngleOffset((prevOffset) => prevOffset + deltaX * rotationSpeed);
      }
      setLastTouchX(touch.clientX);
    }
  };

  // Function to stop dragging (outer circle)
  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchX(null);
  };

  // Function to start dragging (outer circle)
  const handleTouchStart = (event) => {
    if (!isDraggingLeftInner) {
      setIsDragging(true);
      setLastTouchX(event.touches[0].clientX);
    }
  };

  // Function to handle touch movement for rotation (right circle)
  const handleTouchMoveRight = (event) => {
    if (isDraggingRight && !isDraggingLeftInner) {
      const touch = event.touches[0];
      if (lastTouchXRight !== null) {
        const deltaX = touch.clientX - lastTouchXRight;
        const rotationSpeed = 0.0005; // Adjust the rotation speed to make it slower
        setRightAngleOffset(
          (prevOffset) => prevOffset + deltaX * rotationSpeed
        );
      }
      setLastTouchXRight(touch.clientX);
    }
  };

  // Function to stop dragging (right circle)
  const handleTouchEndRight = () => {
    setIsDraggingRight(false);
    setLastTouchXRight(null);
  };

  // Function to start dragging (right circle)
  const handleTouchStartRight = (event) => {
    if (!isDraggingLeftInner) {
      setIsDraggingRight(true);
      setLastTouchXRight(event.touches[0].clientX);
    }
  };

  // Function to handle touch movement for rotation (inner circle)
  const handleTouchMoveInner = (event) => {
    if (isDraggingLeftInner) {
      const touch = event.touches[0];
      if (lastTouchXLeftInner !== null) {
        const deltaX = touch.clientX - lastTouchXLeftInner;
        const rotationSpeed = 0.0002; // Adjust the rotation speed to make it slower
        setLeftInnerAngleOffset(
          (prevOffset) => prevOffset + deltaX * rotationSpeed
        );
      }
      setLastTouchXLeftInner(touch.clientX);
    }
  };

  // Function to stop dragging (inner circle)
  const handleTouchEndInner = () => {
    setIsDraggingLeftInner(false);
    setLastTouchXLeftInner(null);
  };

  // Function to start dragging (inner circle)
  const handleTouchStartInner = (event) => {
    setIsDraggingLeftInner(true);
    setLastTouchXLeftInner(event.touches[0].clientX);
  };

  // Attach the touch event listeners for the outer circle
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

  // Attach the touch event listeners for the right circle
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

  // Attach the touch event listeners for the inner circle
  useEffect(() => {
    if (isDraggingLeftInner) {
      window.addEventListener("touchmove", handleTouchMoveInner);
      window.addEventListener("touchend", handleTouchEndInner);
    } else {
      window.removeEventListener("touchmove", handleTouchMoveInner);
      window.removeEventListener("touchend", handleTouchEndInner);
    }
  }, [isDraggingLeftInner]);

  // Calculate the positions of the visible dots for the outer circle
  const visibleDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalPositions) * Math.PI * 2 + leftAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  // Calculate the positions of the visible dots for the right (mirrored) circle
  const visibleDotsRight = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalPositions) * Math.PI * 2 + rightAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = -radiusY * Math.cos(angle); // Invert the y-coordinate
    return { x, y, index };
  });

  // Calculate the positions of the visible dots for the inner circle
  const visibleInnerDots = Array.from({ length: totalInnerDots }).map(
    (_, index) => {
      const angle =
        (index / totalPositions) * Math.PI * 2 + leftInnerAngleOffset;
      const x = radiusInnerX * Math.sin(angle);
      const y = radiusInnerY * Math.cos(angle);
      return { x, y, index };
    }
  );

  return (
    <div className="relative h-screen overflow-hidden flex flex-col justify-center">
      {/* Semicircle Component (Left) */}
      <div
        ref={outerRef}
        className="absolute top-0 left-0 right-0 h-[200px] rounded-b-full border-2 cursor-pointer"
        onTouchStart={handleTouchStart}
      >
        {visibleDots.slice(0, totalPositions).map((dot) => (
          <div
            key={dot.index}
            className="absolute"
            style={{
              left: `${dot.x + 180}px`, // Center x-coordinate
              top: `${dot.y - 16}px`, // Center y-coordinate and flip direction
              userSelect: "none",
            }}
          >
            <div
              className={`flex gap-4 flex-row ${
                dot.index === 0 ? "border-blue-500" : "border-black"
              }`}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                  dot.index === 0 ? "border-blue-500" : ""
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
        <div
          ref={innerRef}
          className="absolute w-[200px] h-[100px] rounded-b-full border-2 left-[84px] cursor-pointer"
          onTouchStart={handleTouchStartInner}
        >
          {visibleInnerDots.slice(0, totalPositions).map((dot) => (
            <div
              key={dot.index}
              className="absolute"
              style={{
                left: `${dot.x + 90}px`, // Adjust the positioning for the inner circle
                top: `${dot.y - 18}px`,
                userSelect: "none",
              }}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-6 h-6 flex items-center justify-center ${
                  dot.index === 0 ? "border-red-500" : ""
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
      </div>

      {/* Horizontal Scrolling Component */}
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
                className="flex-shrink-0 mx-12 w-10 h-10 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full"
              >
                {index + 1}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Semicircle Component (Right, Mirrored) */}
      <div
        className="absolute bottom-0 right-0 left-0 w-full h-[200px] rounded-t-full border-2 cursor-pointer"
        onTouchStart={handleTouchStartRight}
      >
        {visibleDotsRight.slice(0, totalPositions).map((dot) => (
          <div
            key={dot.index}
            className="absolute"
            style={{
              left: `${dot.x + 180}px`, // Center x-coordinate
              bottom: `${dot.y + 16}px`, // Mirror direction for y-coordinate
              userSelect: "none",
            }}
          >
            <div
              className={`flex gap-4 flex-row ${
                dot.index === 0 ? "border-blue-500" : "border-black"
              }`}
            >
              <div
                className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                  dot.index === 0 ? "border-blue-500" : ""
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
    </div>
  );
};

export default CombinedComponent;

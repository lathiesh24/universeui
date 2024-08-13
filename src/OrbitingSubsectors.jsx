import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const totalDots = 12; // Total number of dots
  const [angleOffset, setAngleOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseY, setLastMouseY] = useState(null);
  const leftCircleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const { clientY } = event;
        if (lastMouseY !== null) {
          const deltaY = clientY - lastMouseY; // Calculate the difference in Y position
          const rotationSpeed = 0.005; // Adjust the speed of rotation
          setAngleOffset((prevOffset) => prevOffset - deltaY * rotationSpeed);
          // Invert the deltaY effect to fix the direction
        }
        setLastMouseY(clientY); // Update the last mouse Y position
      }
    };

    const handleMouseDown = (event) => {
      if (
        leftCircleRef.current &&
        leftCircleRef.current.contains(event.target)
      ) {
        setIsDragging(true);
        setLastMouseY(event.clientY); // Initialize the last mouse Y position
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setLastMouseY(null); // Reset the last mouse Y position
    };

    // Bind mouse events to the left semicircle only
    const leftCircleElement = leftCircleRef.current;
    if (leftCircleElement) {
      leftCircleElement.addEventListener("mousemove", handleMouseMove);
      leftCircleElement.addEventListener("mousedown", handleMouseDown);
    }
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (leftCircleElement) {
        leftCircleElement.removeEventListener("mousemove", handleMouseMove);
        leftCircleElement.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, lastMouseY]);

  // Calculate positions for the rotating dots on the left semicircle
  const radiusX = 350;
  const radiusY = 364;
  const leftDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + angleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  // Calculate positions for the static dots on the right semicircle
  const rightDots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Semicircle */}
      <div
        className="relative h-full w-[375px] rounded-r-full border-2"
        ref={leftCircleRef}
      >
        <div className="absolute h-[500px] w-[250px] rounded-r-full bg-blue-100 shadow-md top-32"></div>
        {leftDots.map((dot) => (
          <div
            key={dot.index}
            className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y + 356}px`,
              userSelect: "none", // Disable text selection
            }}
          >
            {dot.index + 1} {/* Numbering the dots */}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1 relative">
        <div className="absolute left-1/2 top-1/2 h-full border transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Right Semicircle */}
      <div className="relative h-full w-[375px] rounded-l-full border-2">
        <div className="absolute h-[500px] w-[250px] rounded-l-full bg-blue-100 shadow-md top-32 right-0"></div>
        {rightDots.map((dot) => (
          <div
            key={dot.index}
            className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
              right: `${dot.x}px`,
              top: `${dot.y + 356}px`,
              userSelect: "none", // Disable text selection
            }}
          >
            {dot.index + 1} {/* Numbering the dots */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

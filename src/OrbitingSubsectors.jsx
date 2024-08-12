import React, { useState, useEffect } from "react";

const App = () => {
  const totalDots = 10; // Total number of dots
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    // Update the angle offset to create a continuous rotation
    const interval = setInterval(() => {
      setAngleOffset((prevOffset) => prevOffset + 0.01);
    }, 16); // Approximately 60 frames per second

    return () => clearInterval(interval);
  }, []);

  // Calculate positions for the rotating dots
  const radiusX = 350;
  const radiusY = 364;
  const dots = Array.from({ length: totalDots }).map((_, index) => {
    const angle = (index / totalDots) * Math.PI * 2 + angleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Semicircle */}
      <div className="relative h-full w-[375px] rounded-r-full border-2">
        <div className="absolute h-[500px] w-[250px] rounded-r-full bg-blue-100 shadow-md top-32"></div>
        {dots.map((dot) => (
          <div
            key={dot.index}
            className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y + 356}px`,
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
        {dots.map((dot) => (
          <div
            key={dot.index}
            className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
              right: `${dot.x}px`,
              top: `${dot.y + 356}px`,
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

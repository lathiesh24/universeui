import React from "react";

const App = () => {
  const numDots = 5;
  const dots = Array.from({ length: numDots }).map((_, index) => {
    const angle = (index / (numDots - 1)) * Math.PI; 
    const radiusX = 350; 
    const radiusY = 364; 
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle); 
    return { x, y };
  });

  const centerLineHeight = 600;
  const centerLineDots = Array.from({ length: numDots }).map((_, index) => {
    const y = (index / (numDots - 1)) * centerLineHeight;
    return { y };
  });

  return (
    <div className="flex h-screen">
      <div className="relative h-full w-[375px] rounded-r-full border-2">
        <div className="absolute h-[500px] w-[250px] rounded-r-full bg-blue-100 shadow-md top-32"></div>
        {dots.map((dot, index) => (
          <div
            key={index}
            className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y + 356}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1 relative">
        <div className="absolute left-1/2 top-1/2 h-full border transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Center Line Dots */}
        {centerLineDots.map((dot, index) => (
          <div
            key={index}
            className="absolute bg-white shadow-md rounded-full w-10 h-10 border left-1/2"
            style={{
              top: `${dot.y + 80}px`, // Adjust the position to center vertically
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        ))}
      </div>

      {/* Right Corner Div */}
      <div className="relative h-full w-[375px] rounded-l-full border-2">
        <div className="absolute h-[500px] w-[250px] rounded-l-full bg-blue-100 shadow-md top-32 right-0"></div>
        {dots.map((dot, index) => (
          <div
            key={index}
            className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 cursor-pointer"
            style={{
              right: `${dot.x}px`,
              top: `${dot.y + 356}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default App;

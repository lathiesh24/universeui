import React from "react";

const App = () => {
  // Define radius for the semicircle
  const radius = 100; // adjust this value to fit your design needs

  // Calculate the position of each dot using angle and radius
  const dots = Array.from({ length: 5 }).map((_, index) => {
    const angle = (index * 180) / 4; // distribute dots over 180 degrees
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return { x, y, angle };
  });

  return (
    <div className="flex h-screen items-center ">
      <div className="relative h-[750px] w-[375px] rounded-r-full border-2">
        <div className="absolute h-[500px] w-[250px] rounded-r-full bg-blue-500 top-32">
          {dots.map((dot, index) => (
            <div
              key={index}
              className="absolute h-8 w-8 bg-red-500 rounded-full z-10"
              style={{
                transform: `translate(${dot.x}px, ${dot.y}px)`,
                bottom: 0, 
                left: "50%", 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

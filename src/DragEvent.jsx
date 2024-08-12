import React, { useState, useRef } from "react";

const App = () => {
  const radius = 150; 
  const [rotation, setRotation] = useState(0);
  const dialerRef = useRef(null);
  const startAngle = useRef(null);

  const calculateAngle = (x, y) => {
    const rect = dialerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle;
  };

  const handleMouseDown = (e) => {
    const angle = calculateAngle(e.clientX, e.clientY);
    startAngle.current = angle - rotation;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const angle = calculateAngle(e.clientX, e.clientY);
    setRotation(angle - startAngle.current);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const dialerButtons = [
    { label: "1", value: "1", angle: 30 },
    { label: "2", value: "2", angle: 60 },
    { label: "3", value: "3", angle: 90 },
    { label: "4", value: "4", angle: 120 },
    { label: "5", value: "5", angle: 150 },
    { label: "6", value: "6", angle: 180 },
    { label: "7", value: "7", angle: 210 },
    { label: "8", value: "8", angle: 240 },
    { label: "9", value: "9", angle: 270 },
    { label: "*", value: "*", angle: 300 },
    { label: "0", value: "0", angle: 330 },
    { label: "#", value: "#", angle: 0 },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        ref={dialerRef}
        className="relative bg-white rounded-full shadow-lg"
        style={{
          width: 2 * radius,
          height: 2 * radius,
          transform: `rotate(${rotation}deg)`,
          transition: rotation === 0 ? "transform 0.5s ease-out" : "none",
        }}
        onMouseDown={handleMouseDown}
      >
        {dialerButtons.map((button, index) => {
          const angleInRadians = (button.angle * Math.PI) / 180;
          const x = radius + radius * Math.cos(angleInRadians) - 24; // 24 is half of the button width
          const y = radius - radius * Math.sin(angleInRadians) - 24; // 24 is half of the button height

          return (
            <div
              key={index}
              className="absolute bg-blue-500 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center"
              style={{ top: y, left: x }}
            >
              {button.label}
            </div>
          );
        })}
        <div
          className="absolute bg-gray-300 rounded-full"
          style={{
            width: "40px",
            height: "40px",
            top: "calc(50% - 20px)",
            left: "calc(50% - 20px)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default App;

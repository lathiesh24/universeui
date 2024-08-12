import React from "react";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className="relative bg-blue-500 rounded-full overflow-hidden"
        style={{
          width: 300, 
          height: 150, 
          clipPath: "ellipse(100% 100% at 50% 100%)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-700"></div>
      </div>
    </div>
  );
};

export default App;

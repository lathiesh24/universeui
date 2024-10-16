import React from "react";

const MiddleCircle = ({
  showMiddleCircle,
  middleDots,
  handleMouseDownMiddle,
  handleDotClickMiddle,
  middleCenterIndex,
  innerLeftCircleData,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default MiddleCircle;
